const MAX_SUBJECT_LEN = 200;
const MAX_HTML_LEN    = 500_000;

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  RESEND_AUDIENCE_ID: string;
  BROADCAST_SECRET: string;
}

async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const [sigA, sigB] = await Promise.all([
    crypto.subtle.sign("HMAC", key, enc.encode(a)),
    crypto.subtle.sign("HMAC", key, enc.encode(b)),
  ]);
  const aArr = new Uint8Array(sigA);
  const bArr = new Uint8Array(sigB);
  let diff = 0;
  for (let i = 0; i < aArr.length; i++) diff |= aArr[i] ^ bArr[i];
  return diff === 0;
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const headers = { "Content-Type": "application/json" };

  // Verificar token secreto con comparación en tiempo constante
  const auth = request.headers.get("Authorization") ?? "";
  const authOk = await timingSafeEqual(auth, `Bearer ${env.BROADCAST_SECRET}`);
  if (!authOk) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }

  try {
    const body = (await request.json()) as { subject?: string; html?: string };
    const { subject, html } = body;

    if (!subject?.trim() || !html?.trim()) {
      return new Response(JSON.stringify({ error: "Faltan subject y html" }), { status: 400, headers });
    }
    if (subject.trim().length > MAX_SUBJECT_LEN) {
      return new Response(JSON.stringify({ error: `Subject demasiado largo (máx. ${MAX_SUBJECT_LEN})` }), { status: 400, headers });
    }
    if (html.trim().length > MAX_HTML_LEN) {
      return new Response(JSON.stringify({ error: `HTML demasiado largo (máx. ${MAX_HTML_LEN} caracteres)` }), { status: 400, headers });
    }

    if (!env.RESEND_AUDIENCE_ID) {
      return new Response(JSON.stringify({ error: "RESEND_AUDIENCE_ID no configurado" }), { status: 500, headers });
    }

    const FROM = env.RESEND_FROM ?? "Unyona <hello@unyona.com>";

    // Crear el broadcast en Resend
    const createRes = await fetch("https://api.resend.com/broadcasts", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        audience_id: env.RESEND_AUDIENCE_ID,
        from: FROM,
        subject: subject.trim(),
        html: html.trim(),
      }),
    });

    if (!createRes.ok) {
      const err = (await createRes.json()) as { message?: string };
      console.error("[broadcast] create error:", err);
      return new Response(JSON.stringify({ error: err.message ?? "Error al crear el broadcast" }), { status: 500, headers });
    }

    const { id } = (await createRes.json()) as { id: string };

    // Enviar el broadcast
    const sendRes = await fetch(`https://api.resend.com/broadcasts/${id}/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!sendRes.ok) {
      const err = (await sendRes.json()) as { message?: string };
      console.error("[broadcast] send error:", err);
      return new Response(JSON.stringify({ error: err.message ?? "Error al enviar el broadcast" }), { status: 500, headers });
    }

    console.log(`[broadcast] enviado correctamente — id: ${id}`);
    return new Response(JSON.stringify({ success: true, broadcast_id: id }), { headers });
  } catch (err) {
    console.error("[broadcast] unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers });
  }
}
