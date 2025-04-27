import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
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
