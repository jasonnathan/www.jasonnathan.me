import gql from 'graphql-tag';

const getCategories = gql`{
  categories {
    id
    name
    slug
    count

  }
}`

export default getCategories;
