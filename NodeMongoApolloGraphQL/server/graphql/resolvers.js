import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World..!!',
    projects: async () => await Project.find(),
    project: async (_, args) => await Project.findById(args._id),
    tasks: async () => await Task.find(),
    task: async (_, args) => await Task.findById(args._id)
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
    deleteProject: async (_, args) => {
      const deletedProject = await Project.findByIdAndDelete(args._id);

      if (!deletedProject) throw new Error('Project not found');

      return deletedProject;
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
    },
    deleteTask: async (_, args) => {
      const deletedTask = await Task.findByIdAndDelete(args._id);

      if (!deletedTask) throw new Error('Task not found');

      return deletedTask;
    }
  }
};
