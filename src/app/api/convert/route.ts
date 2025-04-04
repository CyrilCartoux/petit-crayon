import { NextResponse } from 'next/server'
// import Replicate from 'replicate'

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// })

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      )
    }

    // Appel à l'API Replicate pour transformer l'image en coloriage
    // const output = await replicate.run(
    //   "jagilley/controlnet-scribble:435061a1b5a4c1e26711f7c0f4d0d5c13d888495a96dd0932158327cd2ee2cbc",
    //   {
    //     input: {
    //       image: image,
    //       prompt: "line art, black and white, coloring page, clean lines, no shading",
    //       num_samples: "1",
    //       image_resolution: "512",
    //       ddim_steps: 20,
    //       scale: 9,
    //       seed: -1,
    //       eta: 0,
    //       a_prompt: "best quality, extremely detailed",
    //       n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
    //     }
    //   }
    // )

    return NextResponse.json({ result: 'output' })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
} 