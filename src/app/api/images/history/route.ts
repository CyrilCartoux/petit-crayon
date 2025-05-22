import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { logApiError, logApiSuccess } from '@/utils/logger';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      logApiError(authError || new Error('User not authenticated'), 'images-history', request);
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Récupérer l'historique des images
    const { data: images, error } = await supabase
      .from('generated_images')
      .select('id, original_image, generated_image, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    console.log(images);

    if (error) {
      logApiError(error, 'images-history', request);
      throw error;
    }

    logApiSuccess({ count: images.length }, 'images-history');
    return NextResponse.json({ images });
  } catch (error) {
    logApiError(error as Error, 'images-history', request);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'historique des images' },
      { status: 500 }
    );
  }
} 