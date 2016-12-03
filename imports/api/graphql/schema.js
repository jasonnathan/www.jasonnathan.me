import { Kind } from 'graphql/language';
import User from './typeDefs/User';
import Post from './typeDefs/Post';
import Category from './typeDefs/Category';
import Skill from './typeDefs/Skill';
import Project from './typeDefs/Project';
import {post, posts,categories,category} from './resolvers/WP/WPPosts';
import {skills,skill,insertSkill,deleteSkill,updateSkill,updateProject} from './resolvers/SkillsMongo';


const RootQuery = `
type SuccessResponse {
  # True if it succeeded
  success: Boolean
}
${User}
${Project}
${Skill}
${Post}
${Category}
type Query {
  user(id: String!): User
  post(slug: String): Post
  posts(category: String): [Post]
  categories: [Category]
  skill(to: String): Skill
  skills: [Skill]
}
type Mutation {
  insertSkill(
    title: String
    to: String
    featuredImage: String
    description: String
  ): Skill
  deleteSkill(
    _id: ID
  ): SuccessResponse
  updateSkill(
    _id: ID
    title: String
    to: String
    featuredImage: String
    description: String
  ): Skill
  updateProject(
    _id: ID
    to: ID
    title: String
    featuredImage: String
    description: String
    index: Int
  ): Project
}`;

const SchemaDefinition = `
schema {
  query: Query
  mutation: Mutation
}`;

const resolvers = {
  Query: {
    user(root, args, context) {
      if (context && context.userId === args.id) {
        return context.user;
      }
    },
    skill,
    skills,
    post,
    posts,
    categories
  },
  Mutation:{
    insertSkill,
    deleteSkill,
    updateSkill,
    updateProject
  },
  User: {
    emails: ({emails}) => emails
  },
  Post:{
    guid: ({guid:{rendered}}) => rendered,
    title: ({title:{rendered}}) => rendered,
    content: ({content:{rendered}}) => rendered,
    excerpt: ({excerpt:{rendered}}) => rendered,
    date: ({date}) => date,
    categories:({categories}) => Promise.await(categories.map(id => category(id)))
  },
  Date: {
    __parseLiteral: (ast) => new Date(ast.value),
    __serialize: value => value,
    __parseValue: value => value
  },
  JSON: {
    __parseLiteral: parseJSONLiteral,
    __serialize: value => value,
    __parseValue: value => value,
  }
}

const parseJSONLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      return Object.create(null);
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
}

export {SchemaDefinition, RootQuery, resolvers}
