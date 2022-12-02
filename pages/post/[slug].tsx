import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'

import { getAllSlugs, getPostAndMorePosts } from 'contentful/api'
import { IPost, IPreviewPost } from 'interface/posts'

import { MainLayout } from 'components/layouts';
import { OtherPreviewPosts, Post } from 'components/ui';

interface Props {
  post: IPost;
  morePosts: IPreviewPost[];
  preview: boolean;
}

const PostPage: NextPage<Props> = ({ post, morePosts, preview = false }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <p>...isLoading</p>
  }

  return (
    <MainLayout
      title={`Bloguie | ${post.title.slice(0, 20)}...`}
      description={`${post.description.slice(0, 50)}`}
      preview={preview}
    >
      <Post post={post} />

      <div className='mt-10'>
        <h2 className='font-semibold mb-4 text-lg'>Otros posts de interes</h2>
        <OtherPreviewPosts posts={morePosts} />
      </div>
    </MainLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs: {slug: string}[] = await getAllSlugs()
  
  const paths = slugs.map(slug => ({
    params: {
      slug: slug.slug
    }
  }))

  console.log({ paths })

  return { paths,  fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const { slug  = '' } = params as { slug: string }
  
  const { post, morePosts } = await getPostAndMorePosts(slug, false)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
      morePosts,
      preview
    },
    revalidate: 604800 // every week
  }
}

export default PostPage