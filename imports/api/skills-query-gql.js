import gql from 'graphql-tag';


const getSkills = gql`
  query {
    skills {
    _id
    to
    icon
    title
  }
}`
export default getSkills;
