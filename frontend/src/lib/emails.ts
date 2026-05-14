function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function contactoEmailHtml(nombre: string, asunto: string, mensaje: string): string {
  const n = esc(nombre);
  const a = esc(asunto);
  const m = esc(mensaje).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Hemos recibido tu mensaje · Unyona</title>
</head>
<body style="margin:0;padding:0;background-color:#e8faf9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8faf9;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#61DBD6 0%,#3ecfcb 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center">
                <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
                  <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
                </div>
                <br>
                <div style="width:64px;height:64px;background:rgba(255,255,255,0.22);border-radius:50%;margin:0 auto 16px;line-height:64px;text-align:center;">
                  <span style="font-size:30px;">✉️</span>
                </div>
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">¡Mensaje recibido!</h1>
                <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.8);letter-spacing:0.5px;">Te responderemos lo antes posible</p>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- WHITE CARD -->
        <tr>
          <td style="background:#ffffff;padding:40px 44px 8px;">
            <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#263238;">Hola, ${n} 👋</p>
            <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">
              Gracias por escribirnos. Hemos recibido tu mensaje sobre
              <strong style="color:#263238;">"${a}"</strong>
              y te responderemos en las próximas <strong style="color:#263238;">24&ndash;48 horas</strong>.
            </p>

            <!-- Message preview -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f2fdfc;border-left:4px solid #61DBD6;border-radius:0 10px 10px 0;padding:18px 22px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#46D4D0;letter-spacing:2px;text-transform:uppercase;">Tu mensaje</p>
                  <p style="margin:0;font-size:14px;color:#455A64;line-height:1.65;font-style:italic;">"${m}"</p>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>

            <p style="margin:0 0 4px;font-size:14px;color:#607D8B;line-height:1.7;">
              Mientras tanto, puedes echar un vistazo a lo que estamos construyendo en Unyona:
              la app para <strong style="color:#263238;">conocer gente cerca y quedar en persona</strong>, sin algoritmos.
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#ffffff;padding:28px 44px 40px;text-align:center;">
            <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(97,219,214,0.4);">
              Descubrir Unyona &rarr;
            </a>
          </td>
        </tr>

        <!-- ACCENT STRIP -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#61DBD6,#FF8781,#61DBD6);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#263238;border-radius:0 0 20px 20px;padding:28px 44px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Recibiste este email porque enviaste un mensaje desde
              <a href="https://unyona.com" style="color:#61DBD6;text-decoration:none;">unyona.com</a>
            </p>
            <p style="margin:0;font-size:12px;color:#546E7A;">&copy; 2025 Unyona &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function adminContactoEmailHtml(nombre: string, email: string, asunto: string, mensaje: string): string {
  const n = esc(nombre);
  const e = esc(email);
  const a = esc(asunto);
  const m = esc(mensaje).replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nuevo mensaje de contacto · Unyona</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:#263238;border-radius:16px 16px 0 0;padding:28px 36px;text-align:center;">
            <div style="display:inline-block;background:rgba(97,219,214,0.15);border-radius:8px;padding:6px 18px;margin-bottom:8px;">
              <span style="font-size:16px;font-weight:900;color:#61DBD6;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
            </div>
            <p style="margin:4px 0 0;font-size:13px;color:#9BA6AD;letter-spacing:0.5px;">Panel de administración</p>
          </td>
        </tr>

        <!-- ALERT BANNER -->
        <tr>
          <td style="background:#61DBD6;padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#263238;">
              📬 Nuevo mensaje de contacto recibido
            </p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:32px 36px;">

            <!-- Sender info -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#f8fffe;border-radius:10px;border:1px solid #d6f5f3;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#46D4D0;letter-spacing:2px;text-transform:uppercase;">Remitente</p>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:3px 0;font-size:14px;color:#607D8B;width:70px;">Nombre:</td>
                      <td style="padding:3px 0;font-size:14px;font-weight:700;color:#263238;">${n}</td>
                    </tr>
                    <tr>
                      <td style="padding:3px 0;font-size:14px;color:#607D8B;">Email:</td>
                      <td style="padding:3px 0;font-size:14px;font-weight:700;color:#263238;">
                        <a href="mailto:${e}" style="color:#46D4D0;text-decoration:none;">${e}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:3px 0;font-size:14px;color:#607D8B;">Asunto:</td>
                      <td style="padding:3px 0;font-size:14px;font-weight:700;color:#263238;">${a}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#607D8B;letter-spacing:2px;text-transform:uppercase;">Mensaje</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #263238;border-radius:0 8px 8px 0;padding:18px 22px;">
                  <p style="margin:0;font-size:14px;color:#263238;line-height:1.7;">${m}</p>
                </td>
              </tr>
            </table>

            <!-- Reply CTA -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="mailto:${e}?subject=Re: ${a}" style="display:inline-block;background:#263238;color:#61DBD6;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:50px;letter-spacing:0.3px;">
                    Responder a ${n} &rarr;
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#eee;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">Unyona &middot; Notificación interna &middot; No responder a este email</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function adminNewsletterEmailHtml(nombre: string, email: string): string {
  const n = esc(nombre);
  const e = esc(email);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nueva suscripción al newsletter · Unyona</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:#263238;border-radius:16px 16px 0 0;padding:28px 36px;text-align:center;">
            <div style="display:inline-block;background:rgba(97,219,214,0.15);border-radius:8px;padding:6px 18px;margin-bottom:8px;">
              <span style="font-size:16px;font-weight:900;color:#61DBD6;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
            </div>
            <p style="margin:4px 0 0;font-size:13px;color:#9BA6AD;letter-spacing:0.5px;">Panel de administración</p>
          </td>
        </tr>

        <tr>
          <td style="background:linear-gradient(135deg,#61DBD6,#46D4D0);padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#263238;">
              🎉 Nueva suscripción al newsletter
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2fdfc;border-radius:10px;border:1px solid #d6f5f3;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#46D4D0;letter-spacing:2px;text-transform:uppercase;">Nuevo suscriptor</p>
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:4px 0;font-size:14px;color:#607D8B;width:70px;">Nombre:</td>
                      <td style="padding:4px 0;font-size:14px;font-weight:700;color:#263238;">${n}</td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;font-size:14px;color:#607D8B;">Email:</td>
                      <td style="padding:4px 0;font-size:14px;font-weight:700;color:#263238;">
                        <a href="mailto:${e}" style="color:#46D4D0;text-decoration:none;">${e}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#eee;border-radius:0 0 16px 16px;padding:18px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">Unyona &middot; Notificación interna &middot; No responder a este email</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function newsletterEmailHtml(nombre: string): string {
  const n = esc(nombre);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>¡Bienvenido a Unyona!</title>
</head>
<body style="margin:0;padding:0;background-color:#e8faf9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8faf9;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#61DBD6 0%,#4ecfcc 60%,#FF8781 100%);border-radius:20px 20px 0 0;padding:48px 44px 44px;text-align:center;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center">
                <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:8px 22px;margin-bottom:24px;">
                  <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
                </div>
                <br>
                <div style="font-size:44px;margin:0 auto 16px;line-height:1;">🎉</div>
                <h1 style="margin:0 0 8px;font-size:27px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">¡Ya eres parte de Unyona!</h1>
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);letter-spacing:0.3px;">Gracias por unirte, ${n}</p>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- WHITE CARD -->
        <tr>
          <td style="background:#ffffff;padding:40px 44px 8px;">
            <p style="margin:0 0 8px;font-size:19px;font-weight:800;color:#263238;">Hola, ${n} 🌟</p>
            <p style="margin:0 0 28px;font-size:15px;color:#607D8B;line-height:1.7;">
              Eres de los primeros en unirte a la comunidad Unyona y eso nos emociona mucho.
              Estamos construyendo algo especial y <strong style="color:#263238;">tú serás el primero en saberlo</strong>.
            </p>

            <!-- What to expect -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#f2fdfc;border-radius:12px;">
              <tr>
                <td style="padding:22px 26px;">
                  <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#46D4D0;letter-spacing:2px;text-transform:uppercase;">Recibirás en tu email</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;">
                        <span style="color:#61DBD6;font-weight:700;margin-right:10px;">✦</span>Novedades y avances exclusivos del producto
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;">
                        <span style="color:#61DBD6;font-weight:700;margin-right:10px;">✦</span>Acceso prioritario a la beta privada
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;">
                        <span style="color:#61DBD6;font-weight:700;margin-right:10px;">✦</span>Noticias de la comunidad y nuevas funciones
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:6px 0;font-size:14px;color:#263238;line-height:1.5;">
                        <span style="color:#FF8781;font-weight:700;margin-right:10px;">✦</span>Ventajas adicionales por llegar primero
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>

            <p style="margin:0 0 4px;font-size:14px;color:#607D8B;line-height:1.7;">
              Unyona es la app para <strong style="color:#263238;">conocer gente cerca y organizar quedadas reales</strong>.
              Del online al offline, conectando personas que comparten tus mismos intereses en tu zona.
              La beta está en camino y tú tienes asiento preferente.
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#ffffff;padding:28px 44px 40px;text-align:center;">
            <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(97,219,214,0.4);">
              Ver qué estamos construyendo &rarr;
            </a>
          </td>
        </tr>

        <!-- ACCENT STRIP -->
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#61DBD6,#FF8781,#61DBD6);font-size:0;line-height:0;">&nbsp;</td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#263238;border-radius:0 0 20px 20px;padding:28px 44px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Te suscribiste al newsletter de Unyona desde
              <a href="https://unyona.com" style="color:#61DBD6;text-decoration:none;">unyona.com</a>
            </p>
            <p style="margin:0;font-size:12px;color:#546E7A;">&copy; 2025 Unyona &middot; Todos los derechos reservados</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
