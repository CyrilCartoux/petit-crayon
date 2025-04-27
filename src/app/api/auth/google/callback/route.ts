import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json(
        { error: 'Code d\'autorisation manquant' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    // Redirection vers la page d'accueil après connexion réussie
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'authentification Google' },
      { status: 500 }
    );
  }
} 