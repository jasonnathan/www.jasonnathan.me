import { Kind } from 'graphql/language';
import Author from './Author';
import Post from './Post';
import Category from './Category';
import Project from './Project';
import Skill from './Skill'
import {getPost, getPosts,getAuthor,getPostsByAuthor,getCategoryByPost,getCategories} from './wp-connector';
import {getSkills, getProjects} from './mongo-connector';

const RootQuery = `
  type Query {
    post(slug: String): Post
    posts: [Post]
    author(id: Int!): Author
    categories: [Category]
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
  }
`;

const resolvers = {
  Query: {
    post(_, args) {
      return getPost(args);
    },
    posts(_, args) {
      return getPosts();
    },
    author(_, args){
      return getAuthor(args);
    },
    categories(_, args){
      return getCategories(args)
    }
  },
  Post:{
    guid: ({guid}) => guid.rendered,
    title: ({title}) => title,
    content: ({content}) => content,
    excerpt: ({excerpt}) => excerpt,
    author:({author}) => getAuthor(author),
    categories:({id}) => getCategoryByPost(id)
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
      const value = Object.create(null);
      ast.fields.forEach(field => {
        if(!field.name)
        console.log(field)
        // value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
}


export {SchemaDefinition, RootQuery, Post, Author, Category, resolvers}
