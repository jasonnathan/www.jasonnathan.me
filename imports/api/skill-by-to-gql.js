import gql from 'graphql-tag';


const getSkill = gql`
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
        _id
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
  }`
export default getSkill;
