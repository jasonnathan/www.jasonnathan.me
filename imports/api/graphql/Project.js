import Skill from './Skill';

const Project = `
  type Skill {
    _id: ID!
    overview: String
    src: String
    skills: [Skill]
  }
`

export default () => [Skill, Project];
