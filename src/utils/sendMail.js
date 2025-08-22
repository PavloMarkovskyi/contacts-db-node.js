import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

export const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env[SMTP.SMTP_HOST],
    port: Number(process.env[SMTP.SMTP_PORT]),

    auth: {
      user: process.env[SMTP.SMTP_USER],
      pass: process.env[SMTP.SMTP_PASSWORD],
    },
  });

  return await transporter.sendMail(options);
};
