import { IPreviewPost } from 'interface/posts';

import { OtherPreviewPost, PostPreview } from 'components/ui';

interface Props {
  posts: IPreviewPost[]
}


export const OtherPreviewPosts = ({ posts }: Props) => {
  return (
    <div className='grid grid-cols-3 gap-x-4 gap-y-4'>
      {
        posts.map(({ date, description, image, slug, title }) => (
          <div key={slug}>
            <OtherPreviewPost
              createdAt={date}
              imageTitle={image.title}
              imageUrl={image.url}
              shortDescription={description}
              slug={slug}
              title={title}
            />
          </div>
        ))
      }
    </div>
  )
}
