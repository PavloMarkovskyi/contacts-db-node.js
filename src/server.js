import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';




export const setupServer = () => { 
const app = express();
app.use(express.json());
app.use(cors());
app.use(pino({
    transport: {
       target: 'pino-pretty'
    },
}),
    );
    
    app.get('/contacts', async (req, res, next) => {
        try {
            const contacts = await getAllContacts();
            res.status(200).json({
                status: 200,
                message: "Successfully found contacts!",
                data: contacts,
            });
        } catch (error) {
            next(error);
    }
    });
    app.get('/contacts/:contactId', async (req, res, next) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);
            if (!contact) {
                return res.status(404).json({message:'Contact not found',})
            }

            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${contactId}!`,
                data: contact,
            });
        } catch (error) {
            next(error);
    }
    });

app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
  });

app.use('/{*catchall}', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
    });
});
    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
});
};