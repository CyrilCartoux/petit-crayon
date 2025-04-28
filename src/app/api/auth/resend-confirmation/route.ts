import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.json(
        { error: 'Utilisateur non connecté ou email non trouvé' },
        { status: 401 }
      );
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Email de confirmation envoyé avec succès' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error resending confirmation email:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
} 