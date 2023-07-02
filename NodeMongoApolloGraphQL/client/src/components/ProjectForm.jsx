import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT, GET_PROJECTS } from '../graphql/projects';
import { useRef } from 'react';

const initialState = {
  name: '',
  description: ''
};

const ProjectForm = () => {
  const [project, setProject] = useState(initialState);
  const titleInput = useRef();

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS
      },
      'GetProjects'
    ]
  });

  const handleChange = e =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createProject({
      variables: {
        name: project.name,
        description: project.description
      }
    });
    setProject(initialState);
    titleInput.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-2/5">
      {error && <p>{error.message}</p>}
      <input
        type="text"
        name="name"
        placeholder="Write a title"
        onChange={handleChange}
        value={project.name}
        ref={titleInput}
        autoFocus
      />
      <textarea
        name="description"
        rows="3"
        placeholder="Write a description"
        onChange={handleChange}
        value={project.description}
      ></textarea>

      <div className="flex justify-end">
        <button disabled={!project.name || !project.description}>
          {loading ? 'Loading...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export { ProjectForm };
