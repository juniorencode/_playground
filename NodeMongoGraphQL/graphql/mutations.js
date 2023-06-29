const { GraphQLString } = require('graphql');
const { User } = require('../models');
const { createJWTToken } = require('../util/auth');

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

    const user = await User({
      username,
      email,
      password,
      displayName
    });
    await user.save();

    const token = createJWTToken(user);

    console.log(token);

    return 'new user created';
  }
};

module.exports = { register };
