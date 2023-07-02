import { useMutation } from '@apollo/client';
import { DELETE_TASK } from '../../graphql/tasks';

const TaskCard = ({ task }) => {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ['getProject']
  });

  return (
    <div>
      <h2>{task.title}</h2>
      <div>
        <button
          onClick={() => {
            deleteTask({
              variables: {
                id: task._id
              }
            });
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

export { TaskCard };
