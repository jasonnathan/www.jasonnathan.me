export default `
  type Skill {
    _id: ID,
    to: String
    icon: String
    status: String
    title: String
    type: String
    category: String
    description: String
    featuredImage: String
    projects: [Project]
  }
`
