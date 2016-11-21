import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SchemaDefinition, RootQuery, Post, Author, resolvers } from '/imports/api/graphql/schema';
import seed from './seed';

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Post, Author],
  resolvers
});

createApolloServer({
    schema,
});

Meteor.startup(() => {
  seed()
})
