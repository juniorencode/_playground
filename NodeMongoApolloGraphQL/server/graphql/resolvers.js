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
    updateProject: async (_, args) => {
      const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true
      });

      if (!updatedProject) throw new Error('Project not found');

      return updatedProject;
    },
    deleteProject: async (_, args) => {
      const deletedProject = await Project.findByIdAndDelete(args._id);

      if (!deletedProject) throw new Error('Project not found');

      Task.deleteMany({ projectId: deletedProject._id });

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
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true
      });

      if (!updatedTask) throw new Error('Task not found');

      return updatedTask;
    },
    deleteTask: async (_, args) => {
      const deletedTask = await Task.findByIdAndDelete(args._id);

      if (!deletedTask) throw new Error('Task not found');

      return deletedTask;
    }
  }
};
