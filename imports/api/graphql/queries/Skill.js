import gql from 'graphql-tag';

export default gql`
query getSkill($to: String){
  skill(to:$to) {
    _id
    to
    icon
    status
    title
    type
    category
    description
    featuredImage
    projects {
      to
      icon
      status
      title
      type
      category
      description
      featuredImage
    }
  }
}
`
