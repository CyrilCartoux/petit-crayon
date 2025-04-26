import { NextResponse } from 'next/server'
import OpenAI, { toFile } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    console.log('Starting image processing with OpenAI...')

    // Vérifier que l'image est en base64
    if (!image.startsWith('data:image/')) {
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

    // Créer la requête à l'API OpenAI
    const result = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt: "Create a perfect line art tracing of the input image with the following characteristics: 1) Maintain exact proportions and details with surgical precision 2) Use pure black lines on white background, absolutely no colors or shading 3) Create clean, crisp lines with consistent stroke weight throughout 4) Optimize for coloring book style with clear boundaries 5) Remove any unnecessary noise or artifacts 6) Enhance contrast for maximum clarity 7) Make sure all lines are connected and complete 8) Preserve facial features and expressions 9) Ensure the final result is suitable for both digital and physical coloring",
      size: "1024x1024",
      quality: "medium"
    })

    console.log('OpenAI response received')

    // Vérifier que la réponse contient bien des données
    if (!result?.data?.[0]?.b64_json) {
      console.error('Invalid response from OpenAI:', result)
      throw new Error('Invalid response from OpenAI')
    }

    // Récupérer l'image en base64 depuis la réponse
    const imageBase64 = result.data[0].b64_json

    // Créer l'URL de données avec le bon type MIME
    const imageUrl = `data:image/png;base64,${imageBase64}`

    // Vérifier que l'URL est valide
    if (!imageUrl.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid image data format')
    }

    console.log('Image successfully generated and formatted')

    return NextResponse.json({ result: imageUrl })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process image' },
      { status: 500 }
    )
  }
} 