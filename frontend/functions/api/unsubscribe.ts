import { bajaConfirmadaEmailHtml } from "../_shared/emails";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  RESEND_TEST_TO?: string;
  RESEND_AUDIENCE_ID: string;
  BROADCAST_SECRET: string;
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyHmac(email: string, token: string, secret: string): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const sigBytes = new Uint8Array(token.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
    return await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(email));
  } catch {
    return false;
  }
}

async function sendEmail(
  apiKey: string,
  payload: { from: string; to: string[]; subject: string; html: string }
): Promise<void> {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function page(ok: boolean, deleteDataUrl?: string): Response {
  const year = new Date().getFullYear();
  const deleteLink = deleteDataUrl
    ? `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? <a href="${deleteDataUrl}" style="color:#61DBD6;text-decoration:none;">Eliminar mis datos</a></p>`
    : `<p style="margin:12px 0 0;font-size:13px;color:#9BA6AD;">¿Quieres eliminar todos tus datos? Escríbenos a <a href="mailto:hello@unyona.com?subject=Eliminar%20mis%20datos" style="color:#61DBD6;text-decoration:none;">hello@unyona.com</a></p>`;

  const html = ok
    ? `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Baja confirmada · Unyona</title></head>
<body style="margin:0;padding:0;background:#e8faf9;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#61DBD6,#3ecfcb);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:7px 20px;margin-bottom:20px;">
        <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">UNYONA</span>
      </div>
      <div style="font-size:40px;margin-bottom:12px;">✅</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Baja confirmada</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Te has dado de baja correctamente del newsletter de Unyona. No recibirás más emails de nuestra parte.</p>
      <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Unyona</a>
      ${deleteLink}
    </div>
    <div style="background:#263238;padding:16px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Unyona</p>
    </div>
  </div>
</body></html>`
    : `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Enlace inválido · Unyona</title></head>
<body style="margin:0;padding:0;background:#e8faf9;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#FF8781,#ff6b63);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:7px 20px;margin-bottom:20px;">
        <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">UNYONA</span>
      </div>
      <div style="font-size:40px;margin-bottom:12px;">❌</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Enlace inválido</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Este enlace no es válido o ya fue utilizado. Si quieres darte de baja escríbenos a <a href="mailto:hello@unyona.com" style="color:#61DBD6;">hello@unyona.com</a>.</p>
      <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Unyona</a>
    </div>
    <div style="background:#263238;padding:16px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#546E7A;">&copy; ${year} Unyona</p>
    </div>
  </div>
</body></html>`;

  return new Response(html, {
    status: ok ? 200 : 400,
    headers: { "Content-Type": "text/html;charset=utf-8" },
  });
}

export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");

  if (!email || !token) return Response.redirect("https://unyona.com/baja?error=1", 302);

  if (!env.BROADCAST_SECRET) {
    console.error("[unsubscribe] BROADCAST_SECRET is not configured");
    return Response.redirect("https://unyona.com/baja?error=1", 302);
  }

  const decodedEmail = decodeURIComponent(email);

  if (!EMAIL_RE.test(decodedEmail)) return Response.redirect("https://unyona.com/baja?error=1", 302);

  const valid = await verifyHmac(decodedEmail, token, env.BROADCAST_SECRET);
  if (!valid) return Response.redirect("https://unyona.com/baja?error=1", 302);

  const res = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email: decodedEmail, unsubscribed: true }),
  });

  if (!res.ok) {
    console.error("[unsubscribe] resend error:", await res.text());
    return Response.redirect("https://unyona.com/baja?error=1", 302);
  }

  // Build delete-data URL for the confirmation page and email
  let deleteDataUrl: string | undefined;
  if (env.BROADCAST_SECRET) {
    const deleteToken = await hmacHex(decodedEmail, env.BROADCAST_SECRET);
    deleteDataUrl = `https://unyona.com/api/delete-data?email=${encodeURIComponent(decodedEmail)}&token=${deleteToken}`;
  }

  // Send confirmation email (non-blocking)
  const FROM    = env.RESEND_FROM   ?? "Unyona <hello@unyona.com>";
  const TEST_TO = env.RESEND_TEST_TO?.trim() || null;
  sendEmail(env.RESEND_API_KEY, {
    from: FROM,
    to: [TEST_TO ?? decodedEmail],
    subject: "Has sido dado de baja del newsletter · Unyona",
    html: bajaConfirmadaEmailHtml(),
  }).catch((err) => console.error("[unsubscribe] confirmation email error:", err));

  console.log(`[unsubscribe] baja procesada: ${decodedEmail}`);
  return Response.redirect("https://unyona.com/baja?ok=1", 302);
}
