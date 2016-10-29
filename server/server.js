import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import { SchemaDefinition, RootQuery, Post, Author, resolvers } from '/imports/api/graphql/schema';

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Post, Author],
  resolvers
});

createApolloServer({
    schema,
});
