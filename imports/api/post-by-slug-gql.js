import gql from 'graphql-tag';

const getPostBySlug = gql`
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

export default getPostBySlug;
