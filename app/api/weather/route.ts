import { NextRequest } from "next/server";
import { getCityBySlug } from "@/data/cities";
import { fetchWeatherForecast } from "../../actions/weather";

// Weather for one city by slug, for cities the user added in the browser.
// The home page calls this instead of the server action because Next runs
// server actions one at a time, so every card would wait for the one before
// it; plain GET requests all load at once. Taking a slug rather than
// coordinates also means only the app's own cities can be looked up
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const city = getCityBySlug(slug);

  if (!city) {
    return Response.json({ error: "Unknown city" }, { status: 404 });
  }

  try {
    return Response.json(await fetchWeatherForecast(city.lat, city.lon));
  } catch {
    return Response.json({ error: "Weather unavailable" }, { status: 502 });
  }
}
