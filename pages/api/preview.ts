import type { NextApiRequest, NextApiResponse } from 'next'
import { getPostBySlug } from '../../contentful/api';

type Data = 
  | { message: string }
  | { message: string, slug: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    res.status(401).json({ message: 'No autorizado' })
  }

  const { slug = '' } = req.query as { slug: string }

  const post = await getPostBySlug(slug)
  
  if (!post) {
    console.log({ "preview_post_returned": post })
    res.status(401).json({ message: 'Invalid slug', slug })
    res.end()
  }

  res.setPreviewData({}, {
    maxAge: 60 * 60, // expire in 1 hour
  })

  res.writeHead(307, { Location: `/post/${post.slug}` })
  res.end()
}