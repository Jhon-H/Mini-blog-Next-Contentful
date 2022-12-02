import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?       : string;
  createdAt        : Date;
  imageTitle       : string;
  shortDescription : string;
  slug             : string;
  title            : string;
  imageUrl         : string;
}

export const OtherPreviewPost = ({
  className,
  createdAt,
  imageTitle,
  shortDescription,
  slug,
  title,
  imageUrl
}: Props) => {
  return (
    <div className='flex flex-col w-full'>
      <Link href={`/post/${slug}`}>
        <picture className='w-full block relative h-48'>
          <Image
            src={imageUrl}
            alt={imageTitle}
            fill
            className='rounded-t-sm'
          />
        </picture>
      </Link>

      <div className='bg-gray-200 py-2 px-4 rounded-b-sm'>
        <p className='text-xs'>Publicado {createdAt.toString()}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}
