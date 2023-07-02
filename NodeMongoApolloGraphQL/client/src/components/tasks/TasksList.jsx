import { TaskCard } from './TaskCard';

const TasksList = ({ tasks }) => {
  if (!tasks.length)
    return (
      <div>
        <div>
          <h1>No Tasks Yet</h1>
        </div>
      </div>
    );

  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export { TasksList };
