import type { NextApiRequest, NextApiResponse } from "next";
import Replicate from 'replicate'

type Data = any;

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY || '',
})

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  

  // POST request to Replicate to start the image restoration generation process
  const image = req.body.imageUrl;
  console.log(image)

  const output = await replicate.run(
    'nohamoamary/nabtah-plant-disease:33eabfb8b9664ec729b58d89d53e7ae8cd4e35979ebd5d27d22d1d95d88f7ee2',
    {
      input: {
        image,
      },
    }
  )

  console.log(output)
  res
    .status(200)
     .json(output);
}
