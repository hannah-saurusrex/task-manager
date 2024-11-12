const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

// Define your GraphQL schema
const typeDefs = gql`
  type Task {
    id: Int!
    title: String!
    description: String
    isCompleted: Boolean!
    createdAt: String!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(id: Int!, isCompleted: Boolean!): Task!
    deleteTask(id: Int!): Task!
  }
`;

// Define resolvers for the schema
const resolvers = {
  Query: {
    tasks: async () => await prisma.task.findMany(),
  },
  Mutation: {
    createTask: async (_, { title, description }) => {
      return await prisma.task.create({
        data: { title, description },
      });
    },
    updateTask: async (_, { id, isCompleted }) => {
      return await prisma.task.update({
        where: { id },
        data: { isCompleted },
      });
    },
    deleteTask: async (_, { id }) => {
      return await prisma.task.delete({
        where: { id },
      });
    },
  },
};

// Set up Apollo Server with Express
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000' + server.graphqlPath)
  );
});
