const { GraphQLString, GraphQLID } = require('graphql');
const { User, Post, Comment } = require('../models');
const { createJWTToken } = require('../util/auth');
const { PostType, CommentType } = require('./types');

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

    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email
    });

    return token;
  }
};

const login = {
  type: GraphQLString,
  description: 'Login a user and returns a token',
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: async (_, args) => {
    const user = await User.findOne({ email: args.email }).select('+password');
    if (!user || args.password !== user.password)
      throw new Error('Invalid Credentials');

    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email
    });

    return token;
  }
};

const createPost = {
  type: PostType,
  description: 'Create a new post',
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve: async (_, args, { verifiedUser }) => {
    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id
    });

    await post.save();

    return post;
  }
};

const updatePost = {
  type: PostType,
  description: 'Update a post',
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve: async (_, args, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('Unauthorized');

    const updatedPost = await Post.findOneAndUpdate(
      { _id: args.id, authorId: verifiedUser },
      { title: args.title, body: args.body },
      { new: true, runValidators: true }
    );

    return updatedPost;
  }
};

const deletePost = {
  type: PostType,
  description: 'Delete a post',
  args: {
    postId: { type: GraphQLID }
  },
  resolve: async (_, args, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('Unauthorized');

    const deletedPost = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: verifiedUser._id
    });

    if (!deletedPost) throw new Error('Post not found');

    return deletedPost;
  }
};

const createComment = {
  type: CommentType,
  description: 'Add a comment to a post',
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLID }
  },
  resolve: async (_, args, { verifiedUser }) => {
    const comment = new Comment({
      comment: args.comment,
      postId: args.postId,
      userId: verifiedUser._id
    });

    return comment.save();
  }
};

module.exports = {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  createComment
};
