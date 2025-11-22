import { NextResponse } from "next/server"
import { mockUser } from "../../../mocks/user"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (email === mockUser.email && password === mockUser.password) {
    return NextResponse.json({
      success: true,
      user: {
        id: mockUser.id,
        email: mockUser.email,
      },
    })
  }

  return NextResponse.json(
    {
      success: false,
      message: "Credenciais inválidas.",
    },
    { status: 401 }
  )
}
