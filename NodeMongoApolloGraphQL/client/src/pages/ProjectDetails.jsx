import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from '../components/tasks/TaskForm';
import { TasksList } from '../components/tasks/TasksList';
import { DELETE_PROJECT, GET_PROJECT } from '../graphql/projects';

const ProjectDetails = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id
    },
    skip: !params.id
  });
  const [deleteProject, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_PROJECT, {
      refetchQueries: ['getProjects']
    });
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await deleteProject({
      variables: {
        id: params.id
      }
    });
    if (result.data.deleteProject._id) {
      navigate('/projects');
    }
  };

  if (loading) return <p>Loading...</p>;
  else if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {deleteError && <p>{deleteError.message}</p>}
      <div>
        <div>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
        <div>
          <button onClick={handleDelete}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <TaskForm />

      <h1>LIST:</h1>

      <TasksList tasks={data.project.tasks} />
    </div>
  );
};

export { ProjectDetails };
