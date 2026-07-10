import { LRUCache } from "lru-cache";
import { headers } from "next/headers";

const WINDOW_MS = 60_000;
const MAX_HITS_PER_WINDOW = 10;

const hitCache = new LRUCache<string, number[]>({
  max: 5000,
  ttl: WINDOW_MS,
});

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

/** Sliding-window rate limit: max 10 hits/minute per IP per action. Returns true if the request is allowed. */
export async function checkRateLimit(action: string): Promise<boolean> {
  const ip = await getClientIp();
  const key = `${action}:${ip}`;
  const now = Date.now();
  const hits = (hitCache.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (hits.length >= MAX_HITS_PER_WINDOW) {
    hitCache.set(key, hits);
    return false;
  }

  hits.push(now);
  hitCache.set(key, hits);
  return true;
}
