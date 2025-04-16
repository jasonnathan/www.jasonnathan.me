import { Kind } from 'graphql/language';
import User from './typeDefs/User';
import Post from './typeDefs/Post';
import Category from './typeDefs/Category';
import Skill from './typeDefs/Skill';
import Project from './typeDefs/Project';

import {
  post, posts, categories, category
} from './resolvers/WP/WPPosts';

import {
  skills, skill, insertSkill, deleteSkill, updateSkill, updateProject
} from './resolvers/SkillsMongo';

// JSON scalar parse logic
const parseJSONLiteral = (ast) => {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach(field => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });
      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
};

// SDL + inline typeDefs
const RootQuery = `
scalar JSON
scalar Date

type SuccessResponse {
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
}
`;

const SchemaDefinition = `
schema {
  query: Query
  mutation: Mutation
}
`;

const resolvers = {
  Query: {
    user(root, args, context) {
      return context?.userId === args.id ? context.user : null;
    },
    skill,
    skills,
    post,
    posts,
    categories,
  },
  Mutation: {
    insertSkill,
    deleteSkill,
    updateSkill,
    updateProject,
  },
  User: {
    emails: ({ emails }) => emails
  },
  Post: {
    guid: ({ guid }) => guid?.rendered,
    title: ({ title }) => title?.rendered,
    content: ({ content }) => content?.rendered,
    excerpt: ({ excerpt }) => excerpt?.rendered,
    categories: async ({ categories }) => await Promise.all(categories.map(id => category(id)))
  },
  Date: {
    __parseLiteral: ast => new Date(ast.value),
    __serialize: value => new Date(value).toISOString(),
    __parseValue: value => new Date(value)
  },
  JSON: {
    __parseLiteral: parseJSONLiteral,
    __serialize: value => value,
    __parseValue: value => value
  }
};

export { SchemaDefinition, RootQuery, resolvers };
