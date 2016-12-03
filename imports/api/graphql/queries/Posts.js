import gql from 'graphql-tag';

export default gql`
query getPosts($category: String){
  posts(category: $category) {
    id
    slug
    title
    excerpt
    date
    modified
    categories{
      slug
    }
    author
    featured_media_url
  }
}
`
