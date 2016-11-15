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
      author {
        name
        avatar_urls
      }
      categories {
        count
        slug
        name
      }
    }
  }`

export default getPostBySlug;
