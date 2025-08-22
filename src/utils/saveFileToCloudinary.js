import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { CLOUDINARY } from '../constants/index.js';

export const saveFileToCloudinary = async (file) => {
  cloudinary.v2.config({
    secure: true,
    cloud_name: process.env[CLOUDINARY.CLOUD_NAME],
    api_key: process.env[CLOUDINARY.API_KEY],
    api_secret: process.env[CLOUDINARY.API_SECRET],
  });

  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
