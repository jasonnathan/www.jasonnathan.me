import gql from 'graphql-tag';

const getPosts = gql`{
  posts {
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
    # author {
    #   id
    #   name
    #   avatar_urls
    # }
    featured_media_url
  }
}`

export default getPosts;
