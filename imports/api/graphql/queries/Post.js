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
    featuredImage {
      uri
    }
    categories {
      count
      slug
      name
    }
  }
}`
