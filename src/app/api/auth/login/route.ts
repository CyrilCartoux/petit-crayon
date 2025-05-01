import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { logApiError, logApiSuccess } from '@/utils/logger'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      logApiError(error, 'login', request)
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 400 }
      )
    }

    logApiSuccess(data, 'login')
    return NextResponse.json({ data })
  } catch (error) {
    logApiError(error, 'login', request)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    )
  }
}
