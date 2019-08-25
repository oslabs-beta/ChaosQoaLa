/* eslint-disable global-require */
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const fs = require('fs');

module.exports = {
  gqlserver: undefined,

  port: 4000,

  chaosSocketServer: undefined,

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
    // eslint-disable-next-line import/no-extraneous-dependencies
    const { chaos, chaosSocketServer } = require('chaos-qoala-agent');
    app.use(chaos);
    this.chaosSocketServer = chaosSocketServer;
    // 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨 🐨

    apollo.applyMiddleware({ app }); // app is from an existing express app
    this.gqlserver = app.listen({ port: this.port }, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Apollo Server ready at http://localhost:${this.port}${apollo.graphqlPath}`);
    });
  },

  stop() {
    // we need to close the chaos socket server for a clean exit
    this.chaosSocketServer.close();
    // then close the gql server
    this.gqlserver.close();
  },
};
