const { GraphQLString } = require('graphql');

const hello = {
  type: GraphQLString,
  description: 'Returns a string',
  resolve: () => 'Hello World..!!'
};

module.exports = { hello };
