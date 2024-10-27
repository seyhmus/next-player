import { items } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const n = Math.min(
    Number(searchParams.get("n") || items.length),
    items.length
  );
  const p = Math.min(
    Number(searchParams.get("p") || 0),
    Math.floor(items.length / n)
  );
  return Response.json(items.slice(p * n, (p + 1) * n));
}
