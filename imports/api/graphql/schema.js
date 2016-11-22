import { Kind } from 'graphql/language';
import Author from './Author';
import Post from './Post';
import Category from './Category';
import Project from './Project';
import Skill from './Skill'

import {post, posts,author,categories,getPostsByAuthor,getCategoryById} from './wp-connector';
import {skills,skill,insertSkill,deleteSkill,updateSkill} from './mongo-connector';

const RootQuery = `
  type SuccessResponse {
    # True if it succeeded
    success: Boolean
  }
  type Skill {
    _id: ID
    to: String
    icon: String
    status: String
    title: String
    type: String
    category: String
    description: String
    featuredImage: String
    projects: [Skill]
  }
  type Query {
    post(slug: String): Post
    posts(category: String): [Post]
    author(id: Int!): Author
    categories: [Category]
    skill(to: String): Skill
    skills: [Skill]
  }
  type Mutation {
    insertSkill(
      title: String
      slug: String
      featuredImage: String
      description: String
    ): Skill
    deleteSkill(
      _id: ID
    ): SuccessResponse
    updateSkill(
      _id: ID
      title: String
    ): SuccessResponse
  }`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    skill,
    skills,
    post,
    posts,
    author,
    categories
  },
  Mutation:{
    insertSkill,
    deleteSkill,
    updateSkill
  },
  Post:{
    guid: ({guid}) => guid.rendered,
    title: ({title}) => title,
    content: ({content}) => content,
    excerpt: ({excerpt}) => excerpt,
    author,
    categories:({categories}) => Promise.await(categories.map(id => getCategoryById(id)))
  },
  Author:{
    posts(_, args){
      return getPostsByAuthor(args.id)
    }
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


export {SchemaDefinition, RootQuery, Post, Author, Category, resolvers}
