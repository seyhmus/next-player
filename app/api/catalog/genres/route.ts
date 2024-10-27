import { genres } from "@/lib/data";

export async function GET() {
  return Response.json(genres)
};
