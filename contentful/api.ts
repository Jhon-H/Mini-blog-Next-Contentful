import { CONTENTFUL_URL } from "../lib/constans"

const POST_PREVIEW_FIELDS = `
title
slug
description
image {
  title,
  url
}
date
`

export const fetchGraphql = async (query: string, preview = false): Promise<any> => {
  try {
    const response = await fetch(CONTENTFUL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ?? ''
            : process.env.CONTENTFUL_ACCESS_TOKEN ?? ''
        }`
      },
      body: JSON.stringify({ query })
    })

    const data = await response.json()

    console.log({ response, err: data.errors })

    return data
  } catch(error) {

    console.log({ error })
    throw Error('Error al obtener entradas de contentful')
  }
}

export const extractPost = (fetchResponse: any) => {
  return fetchResponse?.data?.postCollection?.items[0]
}

export const extractPostEntries = (fetchResponse: any) => {
  return fetchResponse?.data?.postCollection?.items
}


export const getAllPost = async () => {
  const posts = await fetchGraphql(
    `query PostEntryQuery {
      postCollection(order: date_DESC) {
        items {
          ${POST_PREVIEW_FIELDS}
        }
      }
    }`
  )

  return extractPostEntries(posts)
}

export const getPostBySlug = async (slug: string) => {
  const post = await fetchGraphql(`
    query PostEntryQuery {
      postCollection(where: {slug: ${slug}}, limit = 1) {
        items {
          ${POST_PREVIEW_FIELDS}
          author {
            name
          }
        }
      }
    }
  `)

  return extractPost(post) 
}

export const getPostAndMorePosts = async (slug: string) => {
  const post = await fetchGraphql(`
    query PostEntryQuery {
      postCollection(where: {slug: "${slug}"}) {
        items {
          ${POST_PREVIEW_FIELDS}
          author {
            name
          }
        }
      }
    }
  `)

  const morePosts = await fetchGraphql(`
    query PostEntryQuery {
      postCollection(where: {slug_not: "${slug}"}, limit: 3) {
        items {
          ${POST_PREVIEW_FIELDS}
        }
      }
    }
  `)

  return {
    post: extractPost(post) ?? undefined,
    morePosts: extractPostEntries(morePosts)
  }
}

export const getAllSlugs = async () => {
  const slugs = await fetchGraphql(`
    query PostEntryQuery {
      postCollection {
        items {
          slug
        }
      }
    }
  `)

  return extractPostEntries(slugs)
}