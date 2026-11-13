import { NextRequest } from "next/server";
import { getCityBySlug } from "@/data/cities";
import { getWeather } from "../../actions/actions";

// Weather for one city by slug, for cities the user added in the browser
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug") ?? "";
  const city = getCityBySlug(slug);

  if (!city) {
    return Response.json({ error: "Unknown city" }, { status: 404 });
  }

  try {
    return Response.json(await getWeather(city.lat, city.lon));
  } catch {
    return Response.json({ error: "Weather unavailable" }, { status: 502 });
  }
}
