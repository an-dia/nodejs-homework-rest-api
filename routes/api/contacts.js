const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validCreateContact,
  validUpdateContact,
  validUpdateFavoriteContact,
  validObjectId } = require('./valid-contact-router')
const handleError = require('../../helper/handle-error')

router.get('/',  async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      }
    })
  } catch (err) {
    next(err)
  }
  
})

router.get('/:contactId', validObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    console.log(contact)// сработает toObject()
    if (contact){
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contact, // сработает toJSON()
      }
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    }
  } catch (err) {
    next(err)
  }
 
})
/*
router.post('/', validCreateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      }
    })
  } catch (err) {
    next(err)
  }
})
*/

router.post('/', validCreateContact, handleError(async (req, res, next) => {
    const contact = await Contacts.addContact(req.body)
    
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      }
    })
}))

router.put('/:contactId', validUpdateContact, async (req, res, next) => {
   try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact){
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contact,
      }
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact){
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      data: {
        contact,
      }
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId', validObjectId, validUpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if (contact){
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contact,
      }
    })
    } else {
      return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    }
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId/favorite', validObjectId, validUpdateFavoriteContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateStatusContact(req.params.contactId, req.body)
    //  console.log('updateStatusContact', Object.keys(req.body));
    if (contact){
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contact,
      }
    })
    } 
    if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: "missing field favorite"
    })
    }
    
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    
  } catch (err) {
    next(err)
  }
})



module.exports = router
