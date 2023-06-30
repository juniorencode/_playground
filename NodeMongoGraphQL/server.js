const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { connectDB } = require('./db');
const { authenticate } = require('./middlewares/auth');

connectDB();
const app = express();

app.use(authenticate);

app.get('/', (req, res) => {
  res.send('Welcome to my grahql api');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000);
console.log('Server is running on port 3000');
