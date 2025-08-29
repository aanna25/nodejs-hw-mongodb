import { ContactCollection } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContact = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find({ userId });

  const contactsCount = await ContactCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(page, perPage, contactsCount);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await ContactCollection.findOne({
    _id: contactId,
    userId,
  });
};

export const addContact = async (payload, userId) => {
  const contact = await ContactCollection.create({ ...payload, userId });
  return contact;
};

export const updateContactById = async (
  userId,
  contactId,
  payload,
  options = {},
) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!result || !result.value) return null;
  const isNew = Boolean(result.lastErrorObject?.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
