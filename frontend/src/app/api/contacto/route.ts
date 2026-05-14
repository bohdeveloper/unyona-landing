import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactoEmailHtml, adminContactoEmailHtml } from "@/lib/emails";

const resend  = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.RESEND_FROM   ?? "Unyona <hello@unyona.com>";
const NOTIFY  = process.env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
// En test mode, todos los emails van a esta dirección en vez del real
const TEST_TO = process.env.RESEND_TEST_TO?.trim() || null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body as Record<string, string>;

    if (!nombre?.trim() || !email?.trim() || !asunto?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const n = nombre.trim();
    const e = email.trim();
    const a = asunto.trim();
    const m = mensaje.trim();

    // 1. Auto-reply al usuario (o al TEST_TO en modo test)
    const autoReply = await resend.emails.send({
      from: FROM,
      to: [TEST_TO ?? e],
      replyTo: NOTIFY,
      subject: "Hemos recibido tu mensaje · Unyona",
      html: contactoEmailHtml(n, a, m),
    });

    if (autoReply.error) {
      console.error("[contacto] auto-reply error:", autoReply.error);
      return NextResponse.json({ error: autoReply.error.message }, { status: 500 });
    }

    // 2. Notificación interna (o al TEST_TO en modo test)
    const adminNotif = await resend.emails.send({
      from: FROM,
      to: [TEST_TO ?? NOTIFY],
      replyTo: e,
      subject: `[Contacto] ${a} — de ${n}`,
      html: adminContactoEmailHtml(n, e, a, m),
    });

    if (adminNotif.error) {
      console.error("[contacto] admin notification error:", adminNotif.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contacto] unexpected error:", err);
    return NextResponse.json({ error: "Error al procesar tu solicitud" }, { status: 500 });
  }
}
