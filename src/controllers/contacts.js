import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
export const createContactController = async (req, res) => {
  console.log(req.file);
  let photoUrl = null;
  if (req.file) {
    photoUrl =
      process.env.ENABLE_CLOUDINARY === 'true'
        ? await saveFileToCloudinary(req.file)
        : await saveFileToUploadDir(req.file);
  }
  const contactData = { ...req.body, userId: req.user._id, photo: photoUrl };
  const newContact = await createContact(contactData);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};
export const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const updates = { ...req.body };
  if (req.file) {
    updates.photo =
      process.env.ENABLE_CLOUDINARY === 'true'
        ? await saveFileToCloudinary(req.file)
        : await saveFileToUploadDir(req.file);
  }
  const updatedContact = await updateContactById(
    contactId,
    updates,
    req.user._id,
  );
  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: updatedContact,
  });
};
export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContactById(contactId, req.user._id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
