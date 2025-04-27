import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: async () => cookieStore,
    });

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Redirection vers la page spécifiée ou la page d'accueil
      redirect(next);
    }
  }

  // Redirection vers la page d'erreur en cas d'échec
  redirect('/auth/auth-code-error');
} 