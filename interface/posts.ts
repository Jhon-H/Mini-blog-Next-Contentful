import { IRichTextStructGraphql } from "interface/richText";

export interface IPreviewPost {
  slug: string;
  title: string;
  description: string;
  longDescription: IRichTextStructGraphql
  date: Date;
  image: IPostImage;
}

export interface IPostImage {
  url: string;
  title: string;
}

export interface IPost extends IPreviewPost {
  author: Author;
  otherPosts: IPreviewPost[]
}

export interface Author {
  name: string;
}