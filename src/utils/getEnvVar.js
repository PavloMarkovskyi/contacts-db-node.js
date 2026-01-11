import dotenv from 'dotenv';
dotenv.config();
export const getEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Missing ENV: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};
