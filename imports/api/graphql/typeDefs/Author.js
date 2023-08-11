import Post from './Post';

const Author = `
  scalar JSON
  type Author{
    id: Int!
    name: String!
    url: String!
    description: String
    link: String
    slug: String!
    avatar_urls: JSON
    meta: JSON
    posts: [Post]
  }
`
export default () => [Author, Post];
