import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World..!!',
    projects: async () => await Project.find(),
    tasks: async () => await Task.find()
  },
  Mutation: {
    createProject: async (_, args) => {
      const project = new Project({
        name: args.name,
        description: args.description
      });

      const savedProject = await project.save();

      return savedProject;
    },
    createTask: async (_, args) => {
      const projectFound = await Project.findById(args.projectId);

      if (!projectFound) throw new Error('Project not found');

      const task = new Task({
        title: args.title,
        projectId: args.projectId
      });

      const savedTask = await task.save();

      return savedTask;
    }
  }
};
