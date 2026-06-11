import {
  contactoEmailHtml,
  adminContactoEmailHtml,
} from "../_shared/emails";
import { checkRateLimit } from "../_shared/rateLimit";

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  RESEND_TEST_TO?: string;
  AIRTABLE_TOKEN?: string;
  AIRTABLE_BASE_ID?: string;
  AIRTABLE_TABLE?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

async function sendEmail(
  apiKey: string,
  payload: { from: string; to: string[]; reply_to?: string; subject: string; html: string }
): Promise<{ error?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = (await res.json()) as { message?: string };
    return { error: data.message ?? "Error sending email" };
  }
  return {};
}

async function saveToAirtable(
  token: string,
  baseId: string,
  table: string,
  fields: Record<string, string>
): Promise<void> {
  await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const headers = { "Content-Type": "application/json" };

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const allowed = await checkRateLimit(env.RATE_LIMIT_KV, ip, "contacto", 5, 15 * 60);
  if (!allowed) {
    return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo más tarde." }), { status: 429, headers });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }

  try {
    const body = (await request.json()) as Record<string, string>;
    const { nombre, email, asunto, mensaje, website } = body;

    if (website) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (!nombre?.trim() || !email?.trim() || !asunto?.trim() || !mensaje?.trim()) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400, headers });
    }

    const n = nombre.trim();
    const e = email.trim();
    const a = asunto.trim();
    const m = mensaje.trim();

    if (!isValidEmail(e)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400, headers });
    }
    if (n.length > 100) {
      return new Response(JSON.stringify({ error: "Nombre demasiado largo" }), { status: 400, headers });
    }
    if (a.length > 200) {
      return new Response(JSON.stringify({ error: "Asunto demasiado largo" }), { status: 400, headers });
    }
    if (m.length > 5000) {
      return new Response(JSON.stringify({ error: "Mensaje demasiado largo (máx. 5000 caracteres)" }), { status: 400, headers });
    }

    const FROM    = env.RESEND_FROM          ?? "Unyona <hello@unyona.com>";
    const NOTIFY  = env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
    const TEST_TO = env.RESEND_TEST_TO?.trim() || null;

    const autoReply = await sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? e],
      reply_to: NOTIFY,
      subject: "Hemos recibido tu mensaje · Unyona",
      html: contactoEmailHtml(n, a, m),
    });

    if (autoReply.error) {
      console.error("[contacto] auto-reply error:", autoReply.error);
      return new Response(JSON.stringify({ error: "Error al enviar el mensaje" }), { status: 500, headers });
    }

    // Guardar lead en Airtable (no bloqueante)
    if (env.AIRTABLE_TOKEN && env.AIRTABLE_BASE_ID) {
      saveToAirtable(
        env.AIRTABLE_TOKEN,
        env.AIRTABLE_BASE_ID,
        env.AIRTABLE_TABLE ?? "Contactos",
        {
          Nombre: n,
          Email: e,
          Asunto: a,
          Mensaje: m,
          Fecha: new Date().toISOString().split("T")[0],
        }
      ).catch((err) => console.error("[contacto] airtable error:", err));
    }

    const adminNotif = await sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? NOTIFY],
      reply_to: e,
      subject: `[Contacto] ${a} — de ${n}`,
      html: adminContactoEmailHtml(n, e, a, m),
    });

    if (adminNotif.error) {
      console.error("[contacto] admin notification error:", adminNotif.error);
    }

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err) {
    console.error("[contacto] unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error al procesar tu solicitud" }), { status: 500, headers });
  }
}
