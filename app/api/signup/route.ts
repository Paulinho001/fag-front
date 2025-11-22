import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  // apenas retorna sucesso, sem salvar em nenhum lugar
  return NextResponse.json({
    success: true,
    user: {
      id: crypto.randomUUID(),
      email,
    },
  })
}
