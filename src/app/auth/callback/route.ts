import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { getCurrentDomain, getDomainUrl } from '@/utils/domain'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const domain = getCurrentDomain(request)
  const redirectUrl = getDomainUrl(domain)

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Return to the home page of the current domain in case of error
  return NextResponse.redirect(redirectUrl)
} 