import Author from './Author';
import Post from './Post';
import { Kind } from 'graphql/language';
import {getPosts,getAuthor,getPostsByAuthor} from './wp-connector';

const RootQuery = `
  type Query {
    post(id: Int!): Post
    posts: [Post]
    author(id: Int!): Author
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
      return getPosts(args.id);
    },
    posts(_, args) {
      return getPosts();
    },
    author(_, args){
      return getAuthor(args);
    }
  },
  Post:{
    guid: ({guid}) => guid.rendered,
    title: ({title}) => title,
    content: ({content}) => content,
    excerpt: ({excerpt}) => excerpt,
    author:({author}) => getAuthor(author)
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
        value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
}


export {SchemaDefinition, RootQuery, Post, Author, resolvers}
