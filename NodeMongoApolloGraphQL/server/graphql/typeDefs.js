import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    tasks: [Task]
    task(_id: ID!): Task
  }

  type Mutation {
    createProject(name: String, description: String): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    deleteProject(_id: ID!): Project
    createTask(title: String, projectId: ID): Task
    updateTask(_id: ID!, title: String!, projectId: ID): Task
    deleteTask(_id: ID!): Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    tasks: [Task]
    createdAt: String
    updatedAt: String
  }

  type Task {
    _id: ID
    title: String
    projectId: ID
    project: Project
    createdAt: String
    updatedAt: String
  }
`;
