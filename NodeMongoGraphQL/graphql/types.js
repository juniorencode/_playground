const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const { User, Post } = require('../models');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'The user type',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
});

const PostType = new GraphQLObjectType({
  name: 'PostType',
  description: 'The post type',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: parent => User.findById(parent.authorId)
    }
  }
});

const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  description: 'The comment type',
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: parent => User.findById(parent.userId)
    },
    post: {
      type: PostType,
      resolve: parent => Post.findById(parent.postId)
    }
  }
});

module.exports = { UserType, PostType };
