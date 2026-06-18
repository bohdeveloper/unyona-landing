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
  RESEND_AUDIENCE_ID?: string;
  BROADCAST_SECRET?: string;
  RATE_LIMIT_KV?: KVNamespace;
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

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

async function addToAudience(apiKey: string, audienceId: string, email: string, ciudad: string): Promise<void> {
  await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      ...(ciudad ? { last_name: ciudad } : {}),
    }),
  });
}

function listaEsperaEmailHtml(email: string, ciudad: string): string {
  const c = ciudad.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const year = new Date().getFullYear();
  const ciudadLine = c
    ? `<p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Te hemos apuntado en la lista de espera de Unyona en <strong style="color:#263238;">${c}</strong>. Cuando haya suficiente gente en tu zona, serás de los primeros en recibir tu invitación a la beta.</p>`
    : `<p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Te hemos apuntado en la lista de espera de Unyona. Cuando la beta esté lista, serás de los primeros en recibir tu invitación.</p>`;
  void email;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Estás en la lista · Unyona</title>
</head>
<body style="margin:0;padding:0;background-color:#e8faf9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8faf9;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#61DBD6 0%,#3ecfcb 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
            </div>
            <div style="font-size:48px;margin-bottom:12px;">🚀</div>
            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;">¡Ya estás en la lista!</h1>
            <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">Serás de los primeros en acceder a la app</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px 44px 32px;">
            <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#263238;">¡Hola! 👋</p>
            ${ciudadLine}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f2fdfc;border-left:4px solid #61DBD6;border-radius:0 10px 10px 0;padding:18px 22px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#46D4D0;letter-spacing:2px;text-transform:uppercase;">¿Qué viene?</p>
                  <p style="margin:0;font-size:14px;color:#455A64;line-height:1.65;">Perfiles con aficiones · Radar de personas cercanas · Grupos · Chat · Quedadas reales</p>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-size:14px;color:#607D8B;line-height:1.7;">
              Mientras tanto, si tienes sugerencias o quieres contarnos algo, escríbenos a
              <a href="mailto:hello@unyona.com" style="color:#61DBD6;text-decoration:none;">hello@unyona.com</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 44px 32px;text-align:center;">
            <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:50px;">
              Ver la landing de Unyona
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#263238;border-radius:0 0 20px 20px;padding:20px 44px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Unyona &nbsp;&middot;&nbsp; <a href="https://unyona.com/privacidad" style="color:#61DBD6;text-decoration:none;">Privacidad</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const headers = { "Content-Type": "application/json" };

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const allowed = await checkRateLimit(env.RATE_LIMIT_KV, ip, "lista-espera", 3, 60 * 60);
  if (!allowed) {
    return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo más tarde." }), { status: 429, headers });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }

  try {
    const body = (await request.json()) as Record<string, string>;
    const { email, ciudad, website } = body;

    if (website) {
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    if (!email?.trim()) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400, headers });
    }

    const e = email.trim();
    const c = (ciudad ?? "").trim();

    if (!EMAIL_RE.test(e)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400, headers });
    }
    if (c.length > 80) {
      return new Response(JSON.stringify({ error: "Ciudad demasiado larga" }), { status: 400, headers });
    }

    const FROM    = env.RESEND_FROM ?? "Unyona <hello@unyona.com>";
    const NOTIFY  = env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
    const TEST_TO = env.RESEND_TEST_TO?.trim() || null;

    // Añadir a audiencia (no bloqueante)
    if (env.RESEND_AUDIENCE_ID) {
      addToAudience(env.RESEND_API_KEY, env.RESEND_AUDIENCE_ID, e, c).catch((err) =>
        console.error("[lista-espera] audience error:", err)
      );
    }

    // Email de confirmación al usuario
    const userResult = await sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? e],
      subject: "¡Ya estás en la lista de espera de Unyona! 🚀",
      html: listaEsperaEmailHtml(e, c),
    });
    if (userResult.error) {
      console.error("[lista-espera] user email error:", userResult.error);
      return new Response(JSON.stringify({ error: "Error al enviar el correo de confirmación" }), { status: 500, headers });
    }

    // Notificación al admin (no bloqueante)
    const ciudadLabel = c ? ` — ${c}` : "";
    sendEmail(env.RESEND_API_KEY, {
      from: FROM,
      to: [TEST_TO ?? NOTIFY],
      subject: `[Lista de espera] Nueva inscripción${ciudadLabel}`,
      html: `<p><strong>${e}</strong>${c ? ` desde <strong>${c}</strong>` : ""} se ha apuntado a la lista de espera.</p>`,
    }).catch((err) => console.error("[lista-espera] admin notification error:", err));

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err) {
    console.error("[lista-espera] unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error al procesar tu solicitud" }), { status: 500, headers });
  }
}
