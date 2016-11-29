import gql from 'graphql-tag';

export default gql`
query getPostBySlug($slug: String){
  post(slug: $slug) {
    slug
    title
    content
    author
    date
    categories {
      count
      slug
      name
    }
  }
}`
