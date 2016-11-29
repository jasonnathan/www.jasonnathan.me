import { Kind } from 'graphql/language';
import gql from 'graphql-tag';
import Author from './typeDefs/Author';
import Post from './typeDefs/Post';
import Category from './typeDefs/Category';
import {post, posts,categories,getPostsByAuthor,getCategoryById} from './resolvers/wp-connector';
import {skills,skill,insertSkill,deleteSkill,updateSkill,updateProject} from './resolvers/mongo-connector';

const Skill = `
type Project {
  to: ID
  icon: String
  status: String
  title: String
  type: String
  category: String
  description: String
  featuredImage: String
}

type Skill{
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
}`;

const User = `
  type User {
    emails: [Email]
    username: String
    _id: String
  }`;

const RootQuery = `
  type SuccessResponse {
    # True if it succeeded
    success: Boolean
  }
  type Email {
    address: String
    verified: Boolean
  }
  ${User}
  ${Skill}
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
  }
`;

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
    categories:({categories}) => Promise.await(categories.map(id => getCategoryById(id)))
  },
  Author:{
    posts(_, args){
      return getPostsByAuthor(args.id)
    }
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


export {SchemaDefinition, RootQuery, User, Post, Author, Category, Skill, Project, resolvers}
