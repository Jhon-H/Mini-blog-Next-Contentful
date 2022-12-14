import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  | { message: string }
  | { revalidated: boolean; path: string; }


// llame, por ejemplo, api/revalidate?secret=TOKEN, { slug: "post_slug" }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'No autorizado'})
  }

  if (req.query.secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return  res.status(401).json({ message: 'No autorizado'})
  }

  try {
    const { path = '-1' } = req.body.parameters as { path: string }

    await res.revalidate(path)
    await res.revalidate("/")
    return res.json({ revalidated: true, path })
  
  } catch (err) {
    return res.status(500).json({ message: 'Error en la revalidación'})
  }
}
