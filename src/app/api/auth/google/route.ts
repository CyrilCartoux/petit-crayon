import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { getCurrentDomain, getDomainUrl } from '@/utils/domain'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const domain = getCurrentDomain(request)
    const redirectUrl = getDomainUrl(domain)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${redirectUrl}/auth/callback`
      }
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 401 }
      )
    }

    return NextResponse.json({ url: data.url })
  } catch (err) {
    console.error('Google auth error:', err)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'authentification Google' },
      { status: 500 }
    )
  }
}
