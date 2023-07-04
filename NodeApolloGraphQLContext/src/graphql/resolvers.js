const resolvers = {
  Query: {
    hello: async (parent, args, context) => {
      const { db } = context;
      const aux = await db.connection.collection('users').find().toArray();
      console.log(aux);
      return 'Hello World..!!';
    }
  }
};

export default resolvers;
