import { ProjectForm } from '../components/ProjectForm';
import { ProjectList } from '../components/ProjectList';

const Projects = () => (
  <div>
    <h1>Project Manager</h1>
    <div>
      <ProjectForm />
      <ProjectList />
    </div>
  </div>
);

export default Projects;
