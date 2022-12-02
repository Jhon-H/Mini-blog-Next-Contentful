import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  | { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.clearPreviewData()
  res.writeHead(307, { Location: '/' })
  res.end()
}