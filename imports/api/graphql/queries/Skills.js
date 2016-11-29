import gql from 'graphql-tag';

export default gql`
query getSkills{
  skills {
    _id
    to
    icon
    title
    featuredImage
  }
}
`
