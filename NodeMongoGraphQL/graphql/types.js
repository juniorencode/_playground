const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  id: { type: GraphQLID },
  username: { type: GraphQLString },
  email: { type: GraphQLString },
  password: { type: GraphQLString }
});

module.exports = { UserType };
