import gql from 'graphql-tag';


const getPosts = gql`
  query getPosts($category: String){
    posts(category: $category) {
      id
      slug
      title {
        rendered
      }
      excerpt {
        rendered
      }
      categories{
        slug
      }
      author
      featured_media_url
    }
}`
export default getPosts;
