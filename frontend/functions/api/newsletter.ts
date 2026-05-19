import {
  confirmacionHtml,
  yaSubscritoHtml,
} from "../_shared/emails";

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  RESEND_TEST_TO?: string;
  RESEND_AUDIENCE_ID?: string;
  BROADCAST_SECRET?: string;
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

async function sendEmail(
  apiKey: string,
  payload: { from: string; to: string[]; subject: string; html: string }
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

async function isSubscribed(apiKey: string, audienceId: string, email: string): Promise<boolean> {
  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { data?: Array<{ email: string; unsubscribed: boolean }> };
  const contact = data.data?.find((c) => c.email.toLowerCase() === email.toLowerCase());
  return !!contact && !contact.unsubscribed;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const headers = { "Content-Type": "application/json" };

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }

  try {
    const body = (await request.json()) as Record<string, string>;
    const { nombre, email, website } = body;

    if (website) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (!nombre?.trim() || !email?.trim()) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400, headers });
    }

    const n = nombre.trim();
    const e = email.trim();

    if (!isValidEmail(e)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400, headers });
    }
    if (n.length > 100) {
      return new Response(JSON.stringify({ error: "Nombre demasiado largo" }), { status: 400, headers });
    }

    const FROM    = env.RESEND_FROM ?? "Unyona <hello@unyona.com>";
    const TEST_TO = env.RESEND_TEST_TO?.trim() || null;

    // Si ya está suscrito, enviar email informativo en vez del de confirmación
    if (env.RESEND_AUDIENCE_ID) {
      const alreadySubscribed = await isSubscribed(env.RESEND_API_KEY, env.RESEND_AUDIENCE_ID, e).catch(() => false);
      if (alreadySubscribed) {
        console.log(`[newsletter] ya suscrito: ${e}`);
        let unsubUrl = `mailto:hello@unyona.com?subject=Baja%20newsletter`;
        if (env.BROADCAST_SECRET) {
          const token = await hmacHex(e, env.BROADCAST_SECRET);
          unsubUrl = `https://unyona.com/api/unsubscribe?email=${encodeURIComponent(e)}&token=${token}`;
        }
        await sendEmail(env.RESEND_API_KEY, {
          from: FROM,
          to: [TEST_TO ?? e],
          subject: "¡Sigues siendo de los nuestros! 🌟 · Unyona",
          html: yaSubscritoHtml(n, unsubUrl),
        });
        return new Response(JSON.stringify({ success: true }), { headers });
      }
    }

    // Double opt-in: generar token de confirmación con timestamp (48h)
    const ts = Date.now().toString();
    let confirmUrl = `mailto:hello@unyona.com?subject=Confirmar%20suscripción`;
    if (env.BROADCAST_SECRET) {
      const token = await hmacHex(`${e}|${ts}`, env.BROADCAST_SECRET);
      confirmUrl = `https://unyona.com/api/confirm?email=${encodeURIComponent(e)}&ts=${ts}&token=${token}`;
    }

    const result = await sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? e],
      subject: "Confirma tu suscripción a Unyona 📬",
      html: confirmacionHtml(n, confirmUrl),
    });

    if (result.error) {
      console.error("[newsletter] confirmation email error:", result.error);
      return new Response(JSON.stringify({ error: "Error al enviar el mensaje" }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err) {
    console.error("[newsletter] unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error al procesar tu solicitud" }), { status: 500, headers });
  }
}
