/* eslint-disable global-require */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');

module.exports = {

  gqlserver: undefined,
  port: 4000,

  start() {
    // get gql test schema definition
    const pathToSchema = path.resolve(__dirname, '../gql-schema/schema.gql');
    const typeDefs = fs.readFileSync(pathToSchema, 'utf-8');

    // Provide resolver functions for your schema fields
    const resolvers = {
      Query: {
        message: () => 'Hello',
      },
    };

    const apollo = new ApolloServer({ typeDefs, resolvers });
    const app = express();

    // 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨
    // eslint-disable-next-line import/no-unresolved
    const chaos = require('chaos-qoala-agent');
    app.use(chaos);
    // 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨

    apollo.applyMiddleware({ app }); // app is from an existing express app
    this.gqlserver = app.listen({ port: this.port }, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Apollo Server ready at http://localhost:${this.port}${apollo.graphqlPath}`);
    });
  },

  stop() {
    this.gqlserver.close();
  },
};
