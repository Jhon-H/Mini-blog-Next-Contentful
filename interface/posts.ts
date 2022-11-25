export interface PreviewPost {
  slug: string;
  title: string;
  description: string;
  date: Date;
  image: PostImage;
}

export interface PostImage {
  url: string;
  title: string;
}

export interface Post extends PreviewPost {
  author: Author;
  otherPosts: PreviewPost[]
}

export interface Author {
  name: string;
}