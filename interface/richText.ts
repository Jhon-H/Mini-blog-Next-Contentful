import { Document,  } from "@contentful/rich-text-types"

export interface IRichTextStructGraphql {
  json: Document;
  links: Object[]
}