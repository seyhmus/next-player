import { items } from "@/lib/data";

export async function GET() {
  const artistSet = items.reduce((artists, item) => {
    artists.add(item.artist);
    return artists;
  }, new Set<string>());

  return Response.json(artistSet);
}
