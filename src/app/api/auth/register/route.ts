import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { getCurrentDomain, getDomainUrl } from '@/utils/domain'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const supabase = await createClient()
    const domain = getCurrentDomain(request)
    const redirectUrl = getDomainUrl(domain)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${redirectUrl}/auth/confirm`,
      },
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 400 }
      )
    }

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    )
  }
}
