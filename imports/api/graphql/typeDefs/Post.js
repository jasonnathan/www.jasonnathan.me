export default `
scalar Date
scalar JSON


type Post {
  id: Int!
  date: Date
  date_gmt: Date
  guid: String
  modified: Date
  modified_gmt: Date
  slug: ID!
  type: String
  link: String
  title: String
  content: String
  excerpt: String
  author: Int
  categories: [Category]
  comment_status: String
  ping_status: String
  sticky: Boolean
  format: String
  meta: JSON
  jetpack_featured_media_url: String
  featured_media_url: String
  _links: JSON
}`
