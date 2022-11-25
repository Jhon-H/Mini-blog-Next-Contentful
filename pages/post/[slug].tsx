import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image';

import { Post, PreviewPost } from '../../interface/posts'
import { getAllSlugs, getPostAndMorePosts } from '../../contentful/api'

import { MainLayout } from '../../components/layouts';
import { PostPreview } from '../../components/ui';

interface Props {
  post: Post;
  morePosts: PreviewPost[];
}

const PostPage: NextPage<Props> = ({ post, morePosts }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <p>...isLoading</p>
  }

  return (
    <MainLayout title={`Bloguie | ${post.title.slice(0, 20)}...`} description={`${post.description.slice(0, 50)}`}>
      <div>
        <div>
          <picture style={{ width: '100%', height: '300px' }}>
            <Image
              src={post.image.url}
              alt={post.image.title}
              width={400}
              height={400}
              style={{ objectFit: 'cover', width: '100%'}}
            />
          </picture>

          <div>
            <p>Creado: {post.date.toString()}</p>
            <p>Autor: {post.author?.name ?? 'every'}</p>
            <h1>{post.title}</h1>
          </div>
        </div>

        <p>{post.description}</p>

        <div style={{ marginTop: '60px' }}>
          <h2>Otros posts de interes</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {
              morePosts.map(({ date, description, image, slug, title }) => (
                <div key={slug} style={{ width: 'max(300px, 30%)'}}>
                  <PostPreview
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
        </div>
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

  return { paths,  fallback: true }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug  = '' } = ctx.params as { slug: string } 
  
  const { post, morePosts } = await getPostAndMorePosts(slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
      morePosts
    },
    revalidate: 604800 // every week
  }
}

export default PostPage