import { GetStaticProps, NextPage } from 'next'

import { IPreviewPost } from 'interface/posts'
import { getAllPost } from 'contentful/api'

import { MainLayout } from 'components/layouts'
import { OtherPreviewPosts, PostPreview } from 'components/ui'


interface Props {
  posts: IPreviewPost[];
  preview: boolean;
}

const HomePage: NextPage<Props> = ({ posts, preview }) => {
  const mainPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <MainLayout
      title="Bloguie | Home"
      description='Blog sobre tecnología e ingeniería de sofware'
      preview={preview}
    >
      <div className='flex flex-col gap-y-12'>
        <PostPreview
          createdAt={mainPost.date}
          imageTitle={mainPost.image.title}
          imageUrl={mainPost.image.url}
          shortDescription={mainPost.description}
          slug={mainPost.slug}
          title={mainPost.title}
        />

        <OtherPreviewPosts posts={otherPosts} />
      </div>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getAllPost(preview)

  return {
    props: {
      posts: posts ?? [],
      preview
    }
  }
}

export default HomePage
