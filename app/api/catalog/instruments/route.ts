import { instruments } from "@/lib/data";

export async function GET() {
  return Response.json(instruments)
};
