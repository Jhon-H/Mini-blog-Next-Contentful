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

export const PostPreview = ({
  className,
  createdAt,
  imageTitle,
  shortDescription,
  slug,
  title,
  imageUrl
}: Props) => {
  return (
    <div className='flex flex-row-reverse max-w-6xl justify-between w-full'>
      <Image
        src={imageUrl}
        alt={imageTitle}
        width={700}
        height={500}
        className='w-9/12 rounded-sm'
        priority
      />

      <div className='min-h-full'>
        <div className='min-h-full flex flex-col justify-between w-3/4'>
          <h2 className='font-bold text-3xl text-left'>{title}</h2>

          <div className='flex flex-col gap-y-2'>
            <Link href={`/post/${slug}`} className='text-sm hover:text-blue-800 w-fit transition-colors'>
              Leer más {`>`}
            </Link>

            <div className='border-y-2 w-2/3 rounded-sm border-gray-400'/>
          </div>
        </div>
      </div>
    </div>
  )
}
