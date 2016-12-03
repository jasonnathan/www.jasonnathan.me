import gql from 'graphql-tag';

export default gql`
query getPostBySlug($slug: String){
  post(slug: $slug) {
    slug
    title
    content
    author
    date
    modified
    featured_media_url
    categories {
      count
      slug
      name
    }
  }
}`
