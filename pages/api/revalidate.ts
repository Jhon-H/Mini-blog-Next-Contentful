import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  | { message: string }
  | { revalidated: boolean }


// llame, por ejemplo, api/revalidate?secret=TOKEN, { slug: "post_slug" }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!process.env.REVALIDATE_STATIC_PAGES) {
    return res.status(401).json({ message: 'No autorizado'})
  }

  if (req.query.secret !== process.env.REVALIDATE_STATIC_PAGES) {
    return  res.status(401).json({ message: 'No autorizado'})
  }

  try {
    const { path = '-1' } = req.body.parameters as { path: string }

    await res.revalidate(path)
    return res.json({ revalidated: true })
  
  } catch (err) {
    return res.status(500).json({ message: 'Error en la revalidación'})
  }
}
