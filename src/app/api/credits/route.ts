import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer les crédits de l'utilisateur
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();


    if (error) {
      if (error.code === 'PGRST116') {
        // L'utilisateur n'a pas encore de crédits, on initialise à 0
        const { error: insertError } = await supabase
          .from('user_credits')
          .insert({ user_id: user.id, credits: 0 })
          .select()
          .single();

        if (insertError) throw insertError;
        return NextResponse.json({ credits: 0 });
      }
      throw error;
    }

    return NextResponse.json({ credits: data?.credits || 0 });
  } catch (error) {
    console.error('Error fetching credits:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des crédits' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { amount } = await request.json();
    if (typeof amount !== 'number') {
      return NextResponse.json(
        { error: 'Le montant doit être un nombre' },
        { status: 400 }
      );
    }

    // Récupérer les crédits actuels
    const { data: currentData, error: fetchError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const currentCredits = currentData?.credits || 0;
    const newCredits = currentCredits + amount;

    // Mettre à jour les crédits
    const { data, error } = await supabase
      .from('user_credits')
      .upsert({
        user_id: user.id,
        credits: newCredits,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ credits: data.credits });
  } catch (error) {
    console.error('Error updating credits:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des crédits' },
      { status: 500 }
    );
  }
} 