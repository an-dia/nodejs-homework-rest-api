const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
   try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    // console.table(result);
    return result
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(({id}) => id === contactId)
    // console.table(contact);
    return contact
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);
    const contactDel = contacts.filter(({ id }) => id !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(contactDel))
    // console.table(contactById);
    return contactById
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {
   try {
    const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
     const id = uuidv4()
      const newContact = {id, ...body}
      contacts.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(contacts))  
     return contacts
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, body) => {
    try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId)
    const contactUpdate = {
      ...contact,
      ...body
      }
    const updateContactList = contacts.map((contact) => {
		if (contact.id === contactId) {
			contact = contactUpdate;
		}
		return contact;
	});

	await fs.writeFile(contactsPath, JSON.stringify(updateContactList));
    return contactUpdate.id ? contactUpdate : null
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
