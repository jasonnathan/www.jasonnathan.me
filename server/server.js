import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SchemaDefinition, RootQuery, resolvers } from '/imports/api/graphql/schema';

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery],
  resolvers
});

createApolloServer({
    schema,
});
