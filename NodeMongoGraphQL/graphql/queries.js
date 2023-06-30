const { GraphQLList } = require('graphql');
const { UserType } = require('./types');
const { User } = require('../models');

const users = {
  type: new GraphQLList(UserType),
  resolve: () => {
    return User.find();
  }
};

module.exports = { users };
