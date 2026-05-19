interface Env {
  RESEND_API_KEY: string;
  RESEND_AUDIENCE_ID: string;
  BROADCAST_SECRET?: string;
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

function page(ok: boolean): Response {
  const year = new Date().getFullYear();
  const html = ok
    ? `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Datos eliminados · Unyona</title></head>
<body style="margin:0;padding:0;background:#e8faf9;font-family:Arial,Helvetica,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;">
  <div style="max-width:480px;width:100%;margin:32px 16px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#61DBD6,#3ecfcb);padding:40px 40px 32px;text-align:center;">
      <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:7px 20px;margin-bottom:20px;">
        <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:4px;">UNYONA</span>
      </div>
      <div style="font-size:40px;margin-bottom:12px;">🗑️</div>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#fff;">Datos eliminados</h1>
    </div>
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Tus datos han sido eliminados completamente de nuestros sistemas. No recibirás más comunicaciones de Unyona.</p>
      <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 28px;border-radius:50px;">Volver a Unyona</a>
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
      <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">Este enlace no es válido. Si deseas eliminar tus datos escríbenos a <a href="mailto:hello@unyona.com" style="color:#61DBD6;">hello@unyona.com</a>.</p>
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

  if (!email || !token) return page(false);

  const decodedEmail = decodeURIComponent(email);

  if (env.BROADCAST_SECRET) {
    const valid = await verifyHmac(decodedEmail, token, env.BROADCAST_SECRET);
    if (!valid) return page(false);
  }

  // Find contact ID then delete
  const listRes = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
  });

  if (!listRes.ok) {
    console.error("[delete-data] failed to list contacts:", await listRes.text());
    return page(false);
  }

  const listData = (await listRes.json()) as { data?: Array<{ id: string; email: string }> };
  const contact = listData.data?.find((c) => c.email.toLowerCase() === decodedEmail.toLowerCase());

  if (!contact) {
    // Not found — treat as success (already deleted or never existed)
    console.log(`[delete-data] contacto no encontrado (ya eliminado?): ${decodedEmail}`);
    return page(true);
  }

  const delRes = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts/${contact.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}` },
  });

  if (!delRes.ok) {
    console.error("[delete-data] delete error:", await delRes.text());
    return page(false);
  }

  console.log(`[delete-data] datos eliminados: ${decodedEmail}`);
  return page(true);
}
