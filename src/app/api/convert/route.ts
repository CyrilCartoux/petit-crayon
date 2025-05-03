import { NextResponse } from 'next/server'
import OpenAI, { toFile } from 'openai'
import { logApiError, logApiSuccess } from '@/utils/logger'
import { createClient } from '@/utils/supabase/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Taille maximale de l'image en bytes (5MB)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      logApiError(authError || new Error('User not authenticated'), 'convert', request);
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { image } = await request.json()

    if (!image) {
      logApiError(new Error('Image is required'), 'convert', request)
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Vérifier la taille de l'image
    const base64Data = image.split(',')[1]
    const imageSize = Buffer.byteLength(base64Data, 'base64')
    
    if (imageSize > MAX_IMAGE_SIZE) {
      logApiError(new Error(`Image too large: ${imageSize} bytes`), 'convert', request)
      return NextResponse.json(
        { 
          error: 'L\'image est trop volumineuse',
          details: 'Veuillez utiliser une image de moins de 5MB'
        },
        { status: 413 }
      )
    }

    logApiSuccess({ step: 'start', imageLength: image.length, imageSize }, 'convert')

    // Vérifier que l'image est en base64
    if (!image.startsWith('data:image/')) {
      logApiError(new Error('Invalid image format'), 'convert', request)
      return NextResponse.json(
        { error: 'Invalid image format. Please provide a base64 encoded image.' },
        { status: 400 }
      )
    }

    // Convertir l'image base64 en fichier
    const buffer = Buffer.from(base64Data, 'base64')
    const imageFile = await toFile(buffer, null, {
      type: 'image/png'
    })

    logApiSuccess({ step: 'file_created', size: buffer.length }, 'convert')

    // Créer la requête à l'API OpenAI
    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt: "Create a perfect black-and-white line art tracing of the input image with the following requirements: Preserve exact proportions, shapes, and fine details with high precision. Use pure black lines on a pure white background. No colors, no shading, no grayscale. Draw clean, sharp, and smooth lines with consistent stroke thickness across the entire image. Optimize the composition for a coloring book style: clear separations, bold outlines, no background clutter. Eliminate all noise, artifacts, and unnecessary small details. Maximize contrast and clarity to make the image easy to color. Ensure all contours are closed, lines are fully connected, with no gaps. Accurately preserve facial features, key expressions, and important anatomical elements. Make the final line art simple, friendly, and perfectly suited for both digital and printable coloring pages.",
      size: "auto" as never,
      quality: "medium"
    })

    logApiSuccess({ step: 'openai_response', hasData: !!result?.data?.[0]?.b64_json }, 'convert')

    // Vérifier que la réponse contient bien des données
    if (!result?.data?.[0]?.b64_json) {
      const error = new Error('Invalid response from OpenAI')
      logApiError(error, 'convert', request)
      throw error
    }

    // Récupérer l'image en base64 depuis la réponse
    const imageBase64 = result.data[0].b64_json

    // Créer l'URL de données avec le bon type MIME
    const imageUrl = `data:image/png;base64,${imageBase64}`

    // Vérifier que l'URL est valide
    if (!imageUrl.startsWith('data:image/png;base64,')) {
      const error = new Error('Invalid image data format')
      logApiError(error, 'convert', request)
      throw error
    }

    // Stocker l'image dans Supabase
    const { data: storedImage, error: storageError } = await supabase
      .from('generated_images')
      .insert({
        user_id: user.id,
        original_image: image,
        generated_image: imageUrl,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (storageError) {
      logApiError(storageError, 'convert', request);
      throw storageError;
    }

    logApiSuccess({ step: 'success', imageId: storedImage.id }, 'convert')

    return NextResponse.json({ 
      result: imageUrl,
      imageId: storedImage.id 
    })
  } catch (error: unknown) {
    // Gérer spécifiquement l'erreur de sécurité d'OpenAI
    const openaiError = error as Error;
    console.log('OpenAI Error:', openaiError);
    
    // Vérifier si c'est une erreur de sécurité
    const isSafetyError = 
      openaiError.message.includes('safety system') ||
      openaiError.message.includes('Your request was rejected');

    if (isSafetyError) {
      logApiError(openaiError, 'convert', request);
      return NextResponse.json(
        { 
          error: 'L\'image n\'a pas pu être traitée pour des raisons de sécurité.',
          details: 'L\'image peut contenir du contenu protégé par des droits d\'auteur ou être considérée comme inappropriée. Veuillez essayer avec une autre image.'
        },
        { status: 400 }
      );
    }

    // Pour toutes les autres erreurs
    logApiError(error instanceof Error ? error : new Error('Unknown error'), 'convert', request)
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors du traitement de l\'image.',
        details: 'Veuillez réessayer avec une autre image ou contacter le support si le problème persiste.'
      },
      { status: 500 }
    )
  }
} 