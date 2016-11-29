import Project from './Project';

const Skill = `
  type Skill {
    _id: ID!
    to: String!
    src: String
    title: String
    overview: String!
    category: String
    projects: [Project]
  }
`

export default () => [Skill, Project];
