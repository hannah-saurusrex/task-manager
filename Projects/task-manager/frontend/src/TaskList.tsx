import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK } from './graphql/queries';

const TaskList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreateTask = () => {
    createTask({
      variables: { title: "New Task", description: "This is a new task" },
      refetchQueries: [{ query: GET_TASKS }],
    });
  };

  const handleToggleComplete = (id: number, isCompleted: boolean) => {
    updateTask({
      variables: { id, isCompleted: !isCompleted },
      refetchQueries: [{ query: GET_TASKS }],
    });
  };

  const handleDeleteTask = (id: number) => {
    deleteTask({
      variables: { id },
      refetchQueries: [{ query: GET_TASKS }],
    });
  };

  return (
    <div>
      <h1>Task List</h1>
      <button onClick={handleCreateTask}>Add New Task</button>
      <ul>
        {data.tasks.map((task: any) => (
          <li key={task.id}>
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleToggleComplete(task.id, task.isCompleted)}>
              {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <p>testing</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
