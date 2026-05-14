import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { newsletterEmailHtml, adminNewsletterEmailHtml } from "@/lib/emails";

const resend  = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.RESEND_FROM          ?? "Unyona <hello@unyona.com>";
const NOTIFY  = process.env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
const TEST_TO = process.env.RESEND_TEST_TO?.trim() || null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email } = body as Record<string, string>;

    if (!nombre?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const n = nombre.trim();
    const e = email.trim();

    // 1. Email de bienvenida al suscriptor
    const welcome = await resend.emails.send({
      from: FROM,
      to: [TEST_TO ?? e],
      subject: "¡Bienvenido a la familia Unyona! 🌟",
      html: newsletterEmailHtml(n),
    });

    if (welcome.error) {
      console.error("[newsletter] welcome error:", welcome.error);
      return NextResponse.json({ error: welcome.error.message }, { status: 500 });
    }

    // 2. Notificación interna a hello@unyona.com
    const adminNotif = await resend.emails.send({
      from: FROM,
      to: [TEST_TO ?? NOTIFY],
      subject: `[Newsletter] Nueva suscripción — ${n}`,
      html: adminNewsletterEmailHtml(n, e),
    });

    if (adminNotif.error) {
      console.error("[newsletter] admin notification error:", adminNotif.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter] unexpected error:", err);
    return NextResponse.json({ error: "Error al procesar tu solicitud" }, { status: 500 });
  }
}
