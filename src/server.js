import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(contactsRouter);
  app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
  });
  app.use(errorHandler);
  app.use('/{*catchall}', notFoundHandler);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
