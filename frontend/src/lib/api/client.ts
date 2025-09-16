import { z } from "zod";
import type { Trail } from "@/lib/types/trail";
import { headers } from "next/headers";

const TrailSchema = z.object({
  id: z.string(),
  name: z.string(),
  summary: z.string(),
  distanceKm: z.number(),
  elevationGainM: z.number(),
  difficulty: z.enum(["easy", "moderate", "hard"]),
  offlineAvailable: z.boolean(),
  voiceNav: z.boolean(),
});

async function resolveBaseUrl(): Promise<string> {
  // In the browser, relative URLs work fine
  if (typeof window !== "undefined") return "";
  // Prefer explicit env if provided
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (envBase) return envBase.replace(/\/$/, "");
  // Derive from incoming request headers (RSC / Route Handlers)
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "development" ? "http" : "https");
  return `${proto}://${host}`;
}

export async function getTrail(trailId: string): Promise<Trail> {
  const base = await resolveBaseUrl();
  const res = await fetch(`${base}/api/v1/trails/${trailId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch trail");
  const json = await res.json();
  return TrailSchema.parse(json);
}
