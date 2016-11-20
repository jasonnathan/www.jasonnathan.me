import gql from 'graphql-tag';


const getPosts = gql`
  query _headers($category: String){
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
      author {
        id
        name
        avatar_urls
      }
      featured_media_url
    }
}`
export default getPosts;
