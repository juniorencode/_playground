const { GraphQLString } = require('graphql');
const { User } = require('../models');

const register = {
  type: GraphQLString,
  description: 'Register a new user',
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString }
  },
  resolve: async (_, args) => {
    const { username, email, password, displayName } = args;

    const newUser = await User.create({
      username,
      email,
      password,
      displayName
    });

    console.log(newUser);

    return 'new user created';
  }
};

module.exports = { register };
