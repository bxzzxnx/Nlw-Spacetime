import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize/?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value // undefined / token

  // se ele não estiver logado, vai ser redirecionado para a pagína de auth login
  if (!token) {
    return NextResponse.redirect(signInURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=20;`,
      },
    }) // ja tava salvo as permissões
  } //  HttpOnly não vai deixar o usuário fuxicar o cookie / BackEnd from FrontEnd

  return NextResponse.next() // se ele ja estiver logado blz
}

export const config = {
  matcher: '/memories/:path*',
}
