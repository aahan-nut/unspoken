import { generateSupportiveMessage } from "@/lib/ai/gemini";
import { isRateLimited } from "@/lib/ai/rateLimit";
import { generateMessageRequestSchema } from "@/lib/ai/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(clientKey)) {
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

  const parsed = generateMessageRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request.",
        issues: parsed.error.issues.map((issue) => issue.message),
      },
      { status: 400 }
    );
  }

  try {
    const result = await generateSupportiveMessage(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("generate-message failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { error: "Something went wrong generating your message. Please try again." },
      { status: 500 }
    );
  }
}
