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
        <tr>
          <td style="background:#ffffff;padding:40px 44px 8px;">
            <p style="margin:0 0 6px;font-size:20px;font-weight:800;color:#263238;">Hola, ${n} 👋</p>
            <p style="margin:0 0 24px;font-size:15px;color:#607D8B;line-height:1.7;">
              Gracias por escribirnos. Hemos recibido tu mensaje sobre
              <strong style="color:#263238;">"${a}"</strong>
              y te responderemos en las próximas <strong style="color:#263238;">24&ndash;48 horas</strong>.
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#f2fdfc;border-left:4px solid #61DBD6;border-radius:0 10px 10px 0;padding:18px 22px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#46D4D0;letter-spacing:2px;text-transform:uppercase;">Tu mensaje</p>
                  <p style="margin:0;font-size:14px;color:#455A64;line-height:1.65;font-style:italic;">"${m}"</p>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
            <p style="margin:0 0 4px;font-size:14px;color:#607D8B;line-height:1.7;">
              Mientras tanto, puedes echar un vistazo a lo que estamos construyendo en Unyona:
              la app para <strong style="color:#263238;">conocer gente cerca y quedar en persona</strong>, sin algoritmos.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:28px 44px 40px;text-align:center;">
            <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 38px;border-radius:50px;letter-spacing:0.3px;box-shadow:0 6px 20px rgba(97,219,214,0.4);">
              Descubrir Unyona &rarr;
            </a>
          </td>
        </tr>
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#61DBD6,#FF8781,#61DBD6);font-size:0;line-height:0;">&nbsp;</td>
        </tr>
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
        <tr>
          <td style="background:#263238;border-radius:16px 16px 0 0;padding:28px 36px;text-align:center;">
            <div style="display:inline-block;background:rgba(97,219,214,0.15);border-radius:8px;padding:6px 18px;margin-bottom:8px;">
              <span style="font-size:16px;font-weight:900;color:#61DBD6;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
            </div>
            <p style="margin:4px 0 0;font-size:13px;color:#9BA6AD;letter-spacing:0.5px;">Panel de administración</p>
          </td>
        </tr>
        <tr>
          <td style="background:#61DBD6;padding:14px 36px;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#263238;">
              📬 Nuevo mensaje de contacto recibido
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:32px 36px;">
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
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#607D8B;letter-spacing:2px;text-transform:uppercase;">Mensaje</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #263238;border-radius:0 8px 8px 0;padding:18px 22px;">
                  <p style="margin:0;font-size:14px;color:#263238;line-height:1.7;">${m}</p>
                </td>
              </tr>
            </table>
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

export function chispaHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Cápsula Unyona</title>
</head>
<body style="margin:0;padding:0;background-color:#e8faf9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e8faf9;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="background:linear-gradient(135deg,#61DBD6 0%,#3ecfcb 100%);border-radius:20px 20px 0 0;padding:44px 44px 40px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:10px;padding:8px 22px;margin-bottom:16px;">
              <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">UNYONA</span>
            </div>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">La chispa que lo inicia todo ✨</h1>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);">Tu primera cápsula Unyona</p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px 44px;">
            <p style="margin:0 0 20px;font-size:15px;color:#607D8B;line-height:1.7;">
              Hola 👋 Somos el equipo de Unyona y este es tu primer mensaje como parte de la comunidad.
            </p>
            <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#263238;">🚀 Qué estamos construyendo</h2>
            <p style="margin:0 0 24px;font-size:14px;color:#455A64;line-height:1.7;">
              Unyona es la app para conocer gente cerca y organizar quedadas reales. Estamos en beta privada,
              construyendo el sistema de perfiles, el módulo de intereses y las quedadas locales.
              Cada semana avanzamos un poco más hacia la app que queremos construir contigo.
            </p>
            <h2 style="margin:0 0 12px;font-size:17px;font-weight:800;color:#263238;">📅 Lo que viene</h2>
            <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#455A64;line-height:1.9;">
              <li>Sistema de quedadas y eventos locales</li>
              <li>Módulo de comunidades por ciudad</li>
              <li>Primeras pruebas con usuarios reales</li>
            </ul>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="border-top:1px solid #EEF2F4;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#9BA6AD;line-height:1.6;">
              Gracias por estar aquí desde el principio. Tu apoyo nos motiva cada día.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:0 44px 40px;text-align:center;">
            <a href="https://unyona.com" style="display:inline-block;background:linear-gradient(135deg,#61DBD6,#46D4D0);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:50px;">
              Ver qué estamos construyendo &rarr;
            </a>
          </td>
        </tr>
        <tr>
          <td style="height:4px;background:linear-gradient(90deg,#61DBD6,#FF8781,#61DBD6);font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="background:#263238;border-radius:0 0 20px 20px;padding:24px 44px;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#9BA6AD;line-height:1.6;">
              Recibiste este email porque te suscribiste en
              <a href="https://unyona.com" style="color:#61DBD6;text-decoration:none;">unyona.com</a>
            </p>
            <p style="margin:0;font-size:11px;color:#546E7A;">
              &copy; 2026 Unyona &middot;
              <a href="mailto:hello@unyona.com?subject=Baja%20newsletter" style="color:#546E7A;">Darse de baja</a>
            </p>
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
