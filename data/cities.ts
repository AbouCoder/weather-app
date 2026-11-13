export interface City {
  name: string;
  slug: string;
  lat: number;
  lon: number;
}

export const cities: City[] = [
  // Asia
  { name: "Islamabad", slug: "islamabad", lat: 33.6844, lon: 73.0479 },
  { name: "Tokyo", slug: "tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Seoul", slug: "seoul", lat: 37.5665, lon: 126.978 },
  { name: "Singapore", slug: "singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Mumbai", slug: "mumbai", lat: 19.076, lon: 72.8777 },
  { name: "New Delhi", slug: "new-delhi", lat: 28.6139, lon: 77.209 },
  { name: "Beijing", slug: "beijing", lat: 39.9042, lon: 116.4074 },
  { name: "Bangkok", slug: "bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "Dubai", slug: "dubai", lat: 25.2048, lon: 55.2708 },

  // Europe
  { name: "London", slug: "london", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", slug: "paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", slug: "berlin", lat: 52.52, lon: 13.405 },
  { name: "Madrid", slug: "madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Rome", slug: "rome", lat: 41.9028, lon: 12.4964 },
  { name: "Stockholm", slug: "stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Reykjavík", slug: "reykjavik", lat: 64.1466, lon: -21.9426 },

  // Africa
  { name: "Cairo", slug: "cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Lagos", slug: "lagos", lat: 6.5244, lon: 3.3792 },
  { name: "Nairobi", slug: "nairobi", lat: -1.2921, lon: 36.8219 },
  { name: "Cape Town", slug: "cape-town", lat: -33.9249, lon: 18.4241 },
  { name: "Marrakesh", slug: "marrakesh", lat: 31.6295, lon: -7.9811 },

  // North America
  { name: "New York", slug: "new-york", lat: 40.7128, lon: -74.006 },
  { name: "Los Angeles", slug: "los-angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Toronto", slug: "toronto", lat: 43.6532, lon: -79.3832 },
  { name: "Mexico City", slug: "mexico-city", lat: 19.4326, lon: -99.1332 },
  { name: "Honolulu", slug: "honolulu", lat: 21.3069, lon: -157.8583 },

  // South America
  { name: "São Paulo", slug: "sao-paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Buenos Aires", slug: "buenos-aires", lat: -34.6037, lon: -58.3816 },
  { name: "Lima", slug: "lima", lat: -12.0464, lon: -77.0428 },
  { name: "Bogotá", slug: "bogota", lat: 4.711, lon: -74.0721 },

  // Oceania
  { name: "Sydney", slug: "sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Auckland", slug: "auckland", lat: -36.8485, lon: 174.7633 },
];

// Shown on the home page for everyone; users add more with the Add city dialog
export const defaultCitySlugs = [
  "islamabad",
  "london",
  "new-york",
  "berlin",
  "new-delhi",
  "beijing",
  "tokyo",
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}
