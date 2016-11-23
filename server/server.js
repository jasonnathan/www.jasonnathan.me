import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SchemaDefinition, RootQuery, User, Post, Author, Category, Skill, resolvers } from '/imports/api/graphql/schema';
import seed from './seed';

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, User, Post, Author, Category, Skill],
  resolvers
});

createApolloServer({
    schema,
});

Meteor.startup(() => {
  seed()
})
