import gql from 'graphql-tag';


const getPosts = gql`
  query getPosts($category: String){
    posts(category: $category) {
      id
      slug
      title
      excerpt
      categories{
        slug
      }
      author
      featured_media_url
    }
}`
export default getPosts;
