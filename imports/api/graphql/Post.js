import Author from './Author';

const Post = `
scalar Date
scalar JSON

type RenderedString {
  rendered: String
}

type Post {
  id: Int!
  date: Date
  date_gmt: Date
  guid: RenderedString
  modified: Date
  modified_gmt: Date
  slug: String
  type: String
  link: String
  title: RenderedString
  content: RenderedString
  excerpt: RenderedString
  author: Author
  comment_status: String
  ping_status: String
  sticky: Boolean
  format: String
  meta: JSON
  featured_media_url: String
  _links: JSON
}
`
/**
  categories: [Category]
  tags: [Tag]
  featured_media: Attachment
 */
export default () => [Post, Author];
