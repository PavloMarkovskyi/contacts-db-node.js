import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');
    const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;
    console.log('Connection string:', connectionString);
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
};
