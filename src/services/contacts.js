import { ContactCollection } from '../db/models/Contact.js';

export const getContact = async () => {
  return await ContactCollection.find();
};

export const getContactById = async (contactId) => {
  return await ContactCollection.findById(contactId);
};

export const addContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContactById = async (contactId, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!result || !result.value) return null;
  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContactById = async (contactId) => {
  const contact = await ContactCollection.findByIdAndDelete({
    _id: contactId,
  });
  return contact;
};
