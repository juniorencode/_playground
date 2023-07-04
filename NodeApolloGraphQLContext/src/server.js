import connectDB from './db.js';
import startApolloServer from './app.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

// connectDB();
startApolloServer(typeDefs, resolvers);
