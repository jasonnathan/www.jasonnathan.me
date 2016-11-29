export default `
type Email {
  address: String
  verified: Boolean
}
type User {
  emails: [Email]
  username: String
  _id: String
}`
