import { NextRequest } from "next/server";

export const runtime = "nodejs";

// OpenStreetMap Nominatim: free, keyless reverse geocoding, used only to turn
// coordinates the browser already asked permission for into a human-readable
// "city, country" string — coordinates are never stored or logged.
export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");
  const latNum = Number(lat);
  const lonNum = Number(lon);
  if (!lat || !lon || Number.isNaN(latNum) || Number.isNaN(lonNum) || Math.abs(latNum) > 90 || Math.abs(lonNum) > 180) {
    return Response.json({ error: "lat/lon query params required." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latNum}&lon=${lonNum}&zoom=10&addressdetails=1`,
      { headers: { "User-Agent": "ROAMI-travel-assistant/1.0 (https://roami.travel)" } },
    );
    if (!response.ok) return Response.json({ error: "Location lookup failed." }, { status: 502 });
    const data = await response.json();
    const address = data.address ?? {};
    const place = address.city ?? address.town ?? address.village ?? address.county ?? data.name;
    const country = address.country;
    const label = [place, country].filter(Boolean).join(", ") || data.display_name || null;
    if (!label) return Response.json({ error: "Couldn't identify that location." }, { status: 404 });
    return Response.json({ label });
  } catch (error) {
    console.error("[reverse-geocode] failed:", error);
    return Response.json({ error: "Location lookup failed." }, { status: 502 });
  }
}
