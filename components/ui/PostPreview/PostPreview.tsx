import Image from 'next/image'
import Link from 'next/link'

import styles from './PostPreview.module.scss'

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
    <div className={`${styles['post-preview']} ${className}`}>
      <Link href={`/post/${slug}`}>
        <picture className={styles['image-container']}>
          <Image
            src={imageUrl}
            alt={imageTitle}
            width={500}
            height={300}
            className={styles['image']}
          />
        </picture>
      </Link>

      <div className={styles['info']}>
        <p>Publicado {createdAt.toString()}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}
