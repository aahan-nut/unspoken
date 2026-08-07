import { PlacesConfigError, searchNearbyPlaces } from "@/lib/geo/places";
import { isGeoRateLimited } from "@/lib/geo/rateLimit";
import { nearbySearchRequestSchema } from "@/lib/geo/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || "unknown";

  if (isGeoRateLimited(clientKey)) {
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

  const parsed = nearbySearchRequestSchema.safeParse(body);
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
    const resources = await searchNearbyPlaces(parsed.data);
    return NextResponse.json({
      resources,
      source: "google_places",
      searchedRadiusMeters: parsed.data.radiusMeters,
    });
  } catch (error) {
    if (error instanceof PlacesConfigError) {
      return NextResponse.json(
        { error: "Live nearby search isn't configured yet. Please try again later." },
        { status: 503 }
      );
    }
    // Never log the coordinates themselves — only the failure reason.
    console.error(
      "nearby resource search failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      { error: "Something went wrong searching nearby resources. Please try again." },
      { status: 502 }
    );
  }
}
