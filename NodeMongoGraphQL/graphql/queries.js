const { GraphQLString } = require('graphql');

const users = {
  type: GraphQLString,
  resolve: () => {
    return 'List of users';
  }
};

module.exports = { users };
