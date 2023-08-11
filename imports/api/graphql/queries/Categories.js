import gql from 'graphql-tag';

export default gql`
query getCategories{
  categories {
    id
    name
    slug
    count
  }
}`
