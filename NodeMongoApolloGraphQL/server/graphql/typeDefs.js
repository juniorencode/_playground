import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String
    projects: [Project]
  }

  type Mutation {
    createProject(name: String, description: String): Project
    createTask(title: String, projectId: ID): Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type Task {
    _id: ID
    title: String
    projectId: ID
    createdAt: String
    updatedAt: String
  }
`;
