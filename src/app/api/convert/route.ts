import { NextResponse } from 'next/server'
import OpenAI, { toFile } from 'openai'
import { logApiError, logApiSuccess } from '@/utils/logger'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      logApiError(new Error('Image is required'), 'convert', request)
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    logApiSuccess({ step: 'start', imageLength: image.length }, 'convert')

    // Vérifier que l'image est en base64
    if (!image.startsWith('data:image/')) {
      logApiError(new Error('Invalid image format'), 'convert', request)
      return NextResponse.json(
        { error: 'Invalid image format. Please provide a base64 encoded image.' },
        { status: 400 }
      )
    }

    // Convertir l'image base64 en fichier
    const base64Data = image.split(',')[1]
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

    logApiSuccess({ step: 'success', resultLength: imageUrl.length }, 'convert')

    return NextResponse.json({ result: imageUrl })
  } catch (error) {
    logApiError(error instanceof Error ? error : new Error('Unknown error'), 'convert', request)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process image' },
      { status: 500 }
    )
  }
} 