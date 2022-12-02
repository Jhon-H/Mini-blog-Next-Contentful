import Image from "next/image"

import { IPost } from "interface/posts"
import { RichTextDescription } from 'components/ui';

interface Props {
  post: IPost
}

export const Post = ({ post }: Props) => {
  return (
    <div>
      <div className="mb-8">
        <picture className="w-full relative block h-64 mb-4">
          <Image
            src={post.image.url}
            alt={post.image.title}
            fill
          />
        </picture>

        <div className="mb-4 text-sm">
          <p>Creado: {post.date.toString()}</p>
          <p>Autor: {post.author?.name ?? 'every'}</p>
        </div>

        <h1 className="font-bold text-2xl text-center">{post.title}</h1>
      </div>

      <p>{post.description}</p>
      {
        post.longDescription && (
          <RichTextDescription richTextResponse={post.longDescription} />
        )
      }
    </div>
  )
}
