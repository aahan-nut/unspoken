import { classifySafety } from "@/lib/safety/classifier";
import { isSafetyRateLimited } from "@/lib/safety/rateLimit";
import { classifyRequestSchema } from "@/lib/safety/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";

  if (isSafetyRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = classifyRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request.", issues: parsed.error.issues.map((issue) => issue.message) },
      { status: 400 }
    );
  }

  try {
    const result = await classifySafety(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    // Never log the reflection text itself — only that classification failed.
    console.error(
      "safety classification failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      { error: "Something went wrong processing your check-in. Please try again." },
      { status: 500 }
    );
  }
}
