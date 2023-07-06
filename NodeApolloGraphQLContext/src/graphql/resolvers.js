const resolvers = {
  Query: {
    hello: async (parent, args, context) => {
      const { db } = context;
      const filter = { displayName: { $regex: 'o', $options: 'i' } };
      const users = await db.connection
        .collection('users')
        .find(filter)
        .toArray();
      console.log(users);

      return 'Hello World..!!';
    }
  }
};

export default resolvers;
