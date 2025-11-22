import { NextResponse } from "next/server"
import { mockUser } from "@/mocks/user"

export async function GET() {
  // sempre retorna usuário logado neste mock
  return NextResponse.json({
    user: {
      id: mockUser.id,
      email: mockUser.email,
    },
  })
}
