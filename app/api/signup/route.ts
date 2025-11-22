import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // MOCK SIMPLES
  return NextResponse.json({
    success: true,
    user: {
      id: Date.now(),
      name: body.name,
      email: body.email,
    },
  });
}
