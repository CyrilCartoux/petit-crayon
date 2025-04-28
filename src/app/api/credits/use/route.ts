import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

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
    console.log('Amount:', amount);
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Le montant doit être un nombre positif' },
        { status: 400 }
      );
    }

    // Récupérer les crédits actuels
    const { data: currentData, error: fetchError } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();


    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Pas assez de crédits' },
          { status: 400 }
        );
      }
      throw fetchError;
    }

    const currentCredits = currentData.credits;
    if (currentCredits < amount) {
      return NextResponse.json(
        { error: 'Pas assez de crédits' },
        { status: 400 }
      );
    }

    console.log('user_id:', user.id);
    console.log('currentCredits:', currentCredits);
    console.log('amount:', amount);

    // Mettre à jour les crédits
    const { data, error } = await supabase
      .from('user_credits')
      .update({
        credits: currentCredits - amount,
      })
      .eq('user_id', user.id)
      .select()
      .single();

    console.log('Mise à jour des crédits:', data);
    console.log('Error:', error);
    if (error) throw error;

    return NextResponse.json({ 
      success: true,
      credits: data.credits,
      used: amount
    });
  } catch (error) {
    console.error('Error using credits:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'utilisation des crédits' },
      { status: 500 }
    );
  }
} 