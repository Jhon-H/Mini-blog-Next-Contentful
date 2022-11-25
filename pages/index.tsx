import { GetStaticProps, NextPage } from 'next'

import { PreviewPost } from '../interface/posts'
import { getAllPost } from '../contentful/api'

import { MainLayout } from '../components/layouts'
import { PostPreview } from '../components/ui'

import styles from 'styles/Home.module.scss'

interface Props {
  posts: PreviewPost[]
}

const HomePage: NextPage<Props> = ({ posts }) => {
  return (
    <MainLayout title="Bloguie | Home" description='Blog sobre tecnología e ingeniería de sofware'>
      <div className={styles.home}>
        <h1>Blog sobre tecnología e ingeniería de sofware</h1>

        <PostPreview
          createdAt={posts[0].date}
          imageTitle={posts[0].image.title}
          imageUrl={posts[0].image.url}
          shortDescription={posts[0].description}
          slug={posts[0].slug}
          title={posts[0].title}
          className={styles['main-post']}
        />

        <div className={styles['list-posts']}>
          {
            posts.slice(1).map(({ date, description, image, slug, title }) => (
              <div className={styles['other-post']} key={slug}>
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
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getAllPost()

  return {
    props: {
      posts: posts ?? []
    }
  }
}

export default HomePage
