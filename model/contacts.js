const Contacts = require('./schemas/contact')

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    offset = 0
  } = query
  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const results = await Contacts.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'email subscription -_id'
    },
  })
  return results
}

const getContactById = async (userId, contactId) => {
  const result = await Contacts.findOne( {_id: contactId, owner: userId} ).populate({
    path: 'owner',
    select: 'email subscription -_id'
  })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contacts.findByIdAndRemove( {_id: contactId, owner: userId} )
  return result
}

const addContact = async (userId, body) => {
  // try {
    const result = await Contacts.create({...body, owner: userId})
    return result
  // } catch (err) {
  //   if (err.name === 'ValidationError') {
  //     err.status = 400
  //   }
  //   throw err
  // }
 
}

const updateContact = async (contactId, userId, body) => {
  const result  = await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ... body },
    { new: true },
  )
  return result
}

const updateStatusContact = async (userId, contactId, body) => {
  if (Object.keys(body).length !== 0){
    const result = await Contacts.findByIdAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true }
    )
    return result
  } 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
