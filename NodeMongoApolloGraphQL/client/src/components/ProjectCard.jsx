import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/projects/${project._id}`)}>
      <h2 className="text-lg font-bold">{project.name}</h2>
      <p className="text-slate-400 text-sm">{project.description}</p>
    </div>
  );
};

export { ProjectCard };
