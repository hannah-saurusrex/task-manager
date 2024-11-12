import { gql } from '@apollo/client';

// Query to get all tasks
export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      isCompleted
      createdAt
    }
  }
`;

// Mutation to create a new task
export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String) {
    createTask(title: $title, description: $description) {
      id
      title
      description
      isCompleted
      createdAt
    }
  }
`;

// Mutation to update a task's status
export const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $isCompleted: Boolean!) {
    updateTask(id: $id, isCompleted: $isCompleted) {
      id
      title
      isCompleted
    }
  }
`;

// Mutation to delete a task
export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;
