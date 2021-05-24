const { contacts } = require('./data')

const listContacts = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query
  return { contacts, total: contacts.length, limit, offset}
})

const getContactById = jest.fn((userId, contactId) => {
  const [contact] = contacts.filter((el) => String(el._id === String(contactId)))
  return contact
})

const removeContact = jest.fn((userId, contactId) => {
 const index = contacts.findIndex((el) => String(el._id === String(contactId)))
  if (index === -1) {
  return null
}
  const [contact] = cats.splice(index, 1)  
  return contact
})

const addContact = jest.fn((userId, body) => {
  contacts.push({...body, _id: '6089dd20cfff152dc0f9a132'})
  return {...body, _id: '6089dd20cfff152dc0f9a132'} 
})

const updateContact = jest.fn((contactId, userId, body) => {
  // console.log('contacts', contacts)
  let [contact] = contacts.filter((el) => String(el._id === String(contactId)))
  if (contact) {
    contact = { ...contact, ...body }
  }
  return contact
})

const updateStatusContact = jest.fn((userId, contactId, body) => {
  let [contact] = contacts.filter((el) => String(el._id === String(contactId)))
  if (Object.keys(body).length !== 0){
    contact = { ...contact, ...body }
  } 
  return contact
})

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
