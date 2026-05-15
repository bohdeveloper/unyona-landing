import {
  newsletterEmailHtml,
  adminNewsletterEmailHtml,
} from "../_shared/emails";

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  RESEND_TEST_TO?: string;
  RESEND_AUDIENCE_ID?: string;
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

async function addToAudience(apiKey: string, audienceId: string, nombre: string, email: string): Promise<void> {
  const [firstName, ...rest] = nombre.split(" ");
  await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      first_name: firstName,
      last_name: rest.join(" ") || undefined,
      unsubscribed: false,
    }),
  });
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

    const FROM    = env.RESEND_FROM          ?? "Unyona <hello@unyona.com>";
    const NOTIFY  = env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
    const TEST_TO = env.RESEND_TEST_TO?.trim() || null;

    const welcome = await sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? e],
      subject: "¡Bienvenido a la familia Unyona! 🌟",
      html: newsletterEmailHtml(n),
    });

    if (welcome.error) {
      console.error("[newsletter] welcome error:", welcome.error);
      return new Response(JSON.stringify({ error: "Error al enviar el mensaje" }), { status: 500, headers });
    }

    // Guardar suscriptor en Resend Audience (no bloqueante)
    if (env.RESEND_AUDIENCE_ID) {
      addToAudience(env.RESEND_API_KEY, env.RESEND_AUDIENCE_ID, n, e).catch((err) =>
        console.error("[newsletter] audience error:", err)
      );
    }

    const adminNotif = await sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? NOTIFY],
      subject: `[Newsletter] Nueva suscripción — ${n}`,
      html: adminNewsletterEmailHtml(n, e),
    });

    if (adminNotif.error) {
      console.error("[newsletter] admin notification error:", adminNotif.error);
    }

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err) {
    console.error("[newsletter] unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error al procesar tu solicitud" }), { status: 500, headers });
  }
}
