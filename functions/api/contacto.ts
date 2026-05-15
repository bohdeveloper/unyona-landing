import {
  contactoEmailHtml,
  adminContactoEmailHtml,
} from "../_shared/emails";

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  RESEND_TEST_TO?: string;
}

async function sendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    reply_to?: string;
    subject: string;
    html: string;
  }
): Promise<{ error?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = (await res.json()) as { message?: string };
    return { error: data.message ?? "Error sending email" };
  }
  return {};
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const headers = { "Content-Type": "application/json" };

  try {
    const body = (await request.json()) as Record<string, string>;
    const { nombre, email, asunto, mensaje } = body;

    if (!nombre?.trim() || !email?.trim() || !asunto?.trim() || !mensaje?.trim()) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400, headers }
      );
    }

    const n = nombre.trim();
    const e = email.trim();
    const a = asunto.trim();
    const m = mensaje.trim();

    const FROM = env.RESEND_FROM ?? "Unyona <hello@unyona.com>";
    const NOTIFY = env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
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
      return new Response(
        JSON.stringify({ error: autoReply.error }),
        { status: 500, headers }
      );
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
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud" }),
      { status: 500, headers }
    );
  }
}
