import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation ($title: String!, $projectId: ID!) {
    createTask(title: $title, projectId: $projectId) {
      title
      project {
        _id
      }
    }
  }
`;
