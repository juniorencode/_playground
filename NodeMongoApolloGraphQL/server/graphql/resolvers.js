import Project from '../models/Project.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello World..!!'
  },
  Mutation: {
    createProject: async (_, args) => {
      const project = new Project({
        name: args.name,
        description: args.description
      });

      const savedProject = await project.save();

      return savedProject;
    }
  }
};
