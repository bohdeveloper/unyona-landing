interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

/**
 * Returns false if the IP has exceeded maxRequests in the given window.
 * Falls back to true (allow) if KV is not bound, logging a warning.
 */
export async function checkRateLimit(
  kv: KVNamespace | undefined,
  ip: string,
  endpoint: string,
  maxRequests: number,
  windowSeconds: number
): Promise<boolean> {
  if (!kv) {
    console.warn(`[rateLimit] KV not configured for ${endpoint} — rate limiting disabled`);
    return true;
  }

  const slot = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = `rl:${endpoint}:${ip}:${slot}`;

  try {
    const current = await kv.get(key);
    const count = current ? parseInt(current, 10) : 0;
    if (count >= maxRequests) return false;
    await kv.put(key, String(count + 1), { expirationTtl: windowSeconds * 2 });
    return true;
  } catch (err) {
    console.error("[rateLimit] KV error:", err);
    return true;
  }
}
