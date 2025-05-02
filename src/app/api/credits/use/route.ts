import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { logApiError, logApiSuccess, ErrorWithMessage } from '@/utils/logger';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      logApiError(authError || new Error('User not authenticated'), 'credits-use', request);
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { amount } = await request.json();
    if (typeof amount !== 'number' || amount <= 0) {
      logApiError(new Error(`Invalid amount: ${amount}`), 'credits-use', request);
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
        logApiError(fetchError, 'credits-use', request);
        return NextResponse.json(
          { error: 'Pas assez de crédits' },
          { status: 400 }
        );
      }
      logApiError(fetchError, 'credits-use', request);
      throw fetchError;
    }

    const currentCredits = currentData.credits;
    if (currentCredits < amount) {
      logApiError(new Error(`Insufficient credits: ${currentCredits} < ${amount}`), 'credits-use', request);
      return NextResponse.json(
        { error: 'Pas assez de crédits' },
        { status: 400 }
      );
    }

    // Mettre à jour les crédits
    const { data, error } = await supabase
      .from('user_credits')
      .update({
        credits: currentCredits - amount,
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      logApiError(error, 'credits-use', request);
      throw error;
    }

    // Enregistrer la transaction
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: user.id,
        amount: -amount, // Montant négatif car c'est une utilisation
        type: 'use',
        metadata: {
          operation: 'image_conversion',
          timestamp: new Date().toISOString()
        }
      });

    if (transactionError) {
      logApiError(transactionError, 'credits-use', request);
      throw transactionError;
    }

    logApiSuccess({ userId: user.id, newCredits: data.credits, amountUsed: amount }, 'credits-use');
    return NextResponse.json({ credits: data.credits });
  } catch (error) {
    logApiError(error as ErrorWithMessage, 'credits-use', request);
    return NextResponse.json(
      { error: 'Erreur lors de l\'utilisation des crédits' },
      { status: 500 }
    );
  }
} 