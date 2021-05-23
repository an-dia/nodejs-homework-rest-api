const Contacts = require('../model/contacts')
const {HttpCode} = require('../helper/constants')
// const handleError = require('../../helper/handle-error')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
       data: {
        contacts,
      },
    })
  } catch (e) {
    next(e)
  }
  
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.getContactById(userId, req.params.contactId)
    //console.log(contact)// сработает toObject()
    if (contact){
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
          contact,
        }, // сработает toJSON()
    })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found'
    })
    }
  } catch (e) {
    next(e)
  }
 
}

const createContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.addContact(userId, req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'Contact add',
      data: {
        contact,
      },
    })
  } catch (e) {
    next(e)
  }
}

/*
// router.post('/', validCreateContact, handleError(async (req, res, next) => {
//     const contact = await Contacts.addContact(req.body)
    
//     return res.status(201).json({
//       status: 'success',
//       code: 201,
//       data: {
//         contact,
//       }
//     })
// }))
*/

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
    if (contact){
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contact,
      }
    })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      data: 'Not found'
    })
    }
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.removeContact(userId, req.params.contactId)
    if (contact){
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      message: 'Contact deleted',
      data: {
        contact,
      }
    })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found'
    })
    }
  } catch (e) {
    next(e)
  }
}

const updateContactPatch = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
    if (contact){
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contact,
      }
    })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found'
    })
    }
  } catch (e) {
    next(e)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contact = await Contacts.updateStatusContact(userId, req.params.contactId, req.body)
    //  console.log('updateStatusContact', Object.keys(req.body));
    if (contact){
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contact,
      }
    })
    } 
    if (Object.keys(req.body).length === 0) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: "Missing field favorite"
    })
    }
    
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found'
    })
    
  } catch (e) {
    next(e)
  }
}


module.exports = {
  getAll,
  getById,
  createContact,
  updateContact,
  removeContact,
  updateContactPatch,
  updateStatusContact,
}
