import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const startApolloServer = async (typeDefs, resolvers) => {
  dotenv.config();

  const app = express();
  const { HOST, PORT } = process.env;
  const httpServer = http.createServer(app);

  app.get('/api/v1/', (_, res) => res.send('Welcome to API version 1!'));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/api/v1/graphql', cors(), express.json(), expressMiddleware(server));

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));

  console.log(`Server ready at http://${HOST}:${PORT}/api/v1/graphql`);
};

export default startApolloServer;
