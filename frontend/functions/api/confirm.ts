import { chispaHtml, adminNewsletterEmailHtml } from "../_shared/emails";

interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM?: string;
  CONTACT_NOTIFY_EMAIL?: string;
  RESEND_TEST_TO?: string;
  RESEND_AUDIENCE_ID?: string;
  BROADCAST_SECRET?: string;
}

const TTL_MS = 48 * 60 * 60 * 1000;

async function verifyHmac(message: string, token: string, secret: string): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const sigBytes = new Uint8Array(token.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
    return await crypto.subtle.verify("HMAC", key, sigBytes, enc.encode(message));
  } catch {
    return false;
  }
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
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

async function isSubscribed(apiKey: string, audienceId: string, email: string): Promise<boolean> {
  const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { data?: Array<{ email: string; unsubscribed: boolean }> };
  const contact = data.data?.find((c) => c.email.toLowerCase() === email.toLowerCase());
  return !!contact && !contact.unsubscribed;
}


export async function onRequestGet({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  const ts    = url.searchParams.get("ts");
  const token = url.searchParams.get("token");

  if (!email || !ts || !token) return Response.redirect("https://unyona.com/confirmar?error=1", 302);

  const decodedEmail = decodeURIComponent(email);

  // Verify token expiry (48h)
  const tsNum = parseInt(ts, 10);
  if (isNaN(tsNum) || Date.now() - tsNum > TTL_MS) return Response.redirect("https://unyona.com/confirmar?error=1", 302);

  // Verify HMAC
  if (env.BROADCAST_SECRET) {
    const valid = await verifyHmac(`${decodedEmail}|${ts}`, token, env.BROADCAST_SECRET);
    if (!valid) return Response.redirect("https://unyona.com/confirmar?error=1", 302);
  }

  const FROM   = env.RESEND_FROM          ?? "Unyona <hello@unyona.com>";
  const NOTIFY = env.CONTACT_NOTIFY_EMAIL ?? "hello@unyona.com";
  const TEST_TO = env.RESEND_TEST_TO?.trim() || null;

  // Already confirmed — idempotent
  if (env.RESEND_AUDIENCE_ID) {
    const already = await isSubscribed(env.RESEND_API_KEY, env.RESEND_AUDIENCE_ID, decodedEmail).catch(() => false);
    if (already) return Response.redirect("https://unyona.com/confirmar?ok=1", 302);
  }

  // Add to audience
  if (env.RESEND_AUDIENCE_ID) {
    addToAudience(env.RESEND_API_KEY, env.RESEND_AUDIENCE_ID, decodedEmail.split("@")[0], decodedEmail).catch((err) =>
      console.error("[confirm] audience error:", err)
    );
  }

  // Generate unsubscribe URL for welcome email
  let unsubscribeUrl = `mailto:hello@unyona.com?subject=Baja%20newsletter`;
  if (env.BROADCAST_SECRET) {
    const unsubToken = await hmacHex(decodedEmail, env.BROADCAST_SECRET);
    unsubscribeUrl = `https://unyona.com/api/unsubscribe?email=${encodeURIComponent(decodedEmail)}&token=${unsubToken}`;
  }

  // Send welcome email
  const welcome = await sendEmail(env.RESEND_API_KEY, {
    from: FROM,
    to: [TEST_TO ?? decodedEmail],
    subject: "La chispa que lo inicia todo ✨ · Unyona",
    html: chispaHtml(unsubscribeUrl),
  });
  if (welcome.error) {
    console.error("[confirm] welcome email error:", welcome.error);
  }

  // Admin notification (non-blocking)
  sendEmail(env.RESEND_API_KEY, {
    from: FROM,
    to: [TEST_TO ?? NOTIFY],
    subject: `[Newsletter] Nueva suscripción confirmada — ${decodedEmail}`,
    html: adminNewsletterEmailHtml(decodedEmail.split("@")[0], decodedEmail),
  }).catch((err) => console.error("[confirm] admin notification error:", err));

  console.log(`[confirm] suscripción confirmada: ${decodedEmail}`);
  return Response.redirect("https://unyona.com/confirmar?ok=1", 302);
}
