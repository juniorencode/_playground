import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

// top level await
export const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
