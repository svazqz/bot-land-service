import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import { root } from './resolvers';

const cors = require('cors');
const server = express();

server.use(cors());

// setup graphql
server.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

export default server;
