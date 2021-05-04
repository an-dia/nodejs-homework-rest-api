const Contacts = require('./schemas/contact')

const listContacts = async () => {
  const results = await Contacts.find()
  return results
}

const getContactById = async (contactId) => {
  const result = await Contacts.findOne( {_id: contactId} )
  return result
}

const removeContact = async (contactId) => {
  const result = await Contacts.findByIdAndRemove( {_id: contactId} )
  return result
}

const addContact = async (body) => {
  // try {
    const result = await Contacts.create(body)
    return result
  // } catch (err) {
  //   if (err.name === 'ValidationError') {
  //     err.status = 400
  //   }
  //   throw err
  // }
 
}

const updateContact = async (contactId, body) => {
  const result  = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { ... body },
    { new: true },
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
  if (Object.keys(body).length !== 0){
    const result = await Contacts.findByIdAndUpdate(
      { _id: contactId },
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
