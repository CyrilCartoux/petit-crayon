import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    try {
      const cookieStore = cookies();
      const supabase = createRouteHandlerClient({ cookies: async () => cookieStore });
      
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Erreur lors de l\'échange du code:', error);
        return NextResponse.redirect(
          `${requestUrl.origin}/auth?error=exchange_error`
        );
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      return NextResponse.redirect(
        `${requestUrl.origin}/auth?error=unexpected_error`
      );
    }
  }

  console.log('requestUrl', requestUrl)
  // Redirection vers la page d'accueil après connexion réussie
  return NextResponse.redirect(requestUrl.origin);
} 