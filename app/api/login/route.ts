import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log("REQ BODY:", email, password); // DEBUG

  if (email === "teste@teste.com" && password === "123456") {
    return NextResponse.json({
      success: true,
      user: {
        id: 1,
        name: "Usuário Teste",
        email,
      },
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
