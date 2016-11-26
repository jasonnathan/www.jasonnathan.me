import gql from 'graphql-tag';

const getPostBySlug = gql`
  query getPostBySlug($slug: String){
    post(slug: $slug) {
      slug
      title{
        rendered
      }
      content{
        rendered
      }
      author
      categories {
        count
        slug
        name
      }
    }
  }`

export default getPostBySlug;
