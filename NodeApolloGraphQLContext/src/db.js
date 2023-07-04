import dotenv from 'dotenv';
import mongoose from 'mongoose';

const connectDB = async () => {
  dotenv.config();
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
  const credentials = `${DB_USER}:${DB_PASSWORD}@`;

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(
      `mongodb://${DB_USER ? credentials : ''}${DB_HOST}:${DB_PORT}/${DB_NAME}`
    );
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
