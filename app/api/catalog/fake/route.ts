import { generateFakeItems } from "@/lib/fake";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const n = searchParams.get('n') || 10000
  let catalog = generateFakeItems(Number(n));
  return Response.json(catalog)
};
