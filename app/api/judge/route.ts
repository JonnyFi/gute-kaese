import { NextResponse } from "next/server";
import { judge } from "@/lib/jev";

export const runtime = "nodejs";

// Best-effort in-memory rate limit. Resets per serverless instance; good enough
// to stop a runaway client loop, not meant as real abuse protection.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 40;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (hits.size > 5000) hits.clear(); // keep the map from growing without bound
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Wait a moment." },
      { status: 429 },
    );
  }

  let text: unknown;
  try {
    ({ text } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Please enter something." }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: "Too long. Maximum 2000 characters." }, { status: 400 });
  }

  try {
    const { score, confidence, level } = await judge(text);
    return NextResponse.json({
      score,
      confidence,
      level,
      verdict: score >= 0.5 ? "gute" : "schlechte",
    });
  } catch (error) {
    console.error("judge failed", error);
    return NextResponse.json(
      { error: "Jev isn't answering right now. Try again." },
      { status: 502 },
    );
  }
}