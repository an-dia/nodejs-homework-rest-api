const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {
  validQueryContact,
  validCreateContact,
  validUpdateContact,
  validUpdateFavoriteContact,
  validObjectId } = require('./valid-contact-router')
const guard = require('../../helper/guard')
// const passport = require('passport')

// router.get('/', passport.authenticate('jwt', { session: false }),  ctrl.getAll)
router.get('/', guard, validQueryContact, ctrl.getAll)
router.post('/', guard, validCreateContact, ctrl.createContact)

router.get('/:contactId', guard, validObjectId, ctrl.getById)
router.put('/:contactId', guard, validUpdateContact, ctrl.updateContact)
router.delete('/:contactId', guard, ctrl.removeContact)
router.patch('/:contactId', guard, validObjectId, validUpdateContact, ctrl.updateContactPatch)
router.patch(
  '/:contactId/favorite',
  guard,
  validUpdateFavoriteContact,
  ctrl.updateStatusContact
)


module.exports = router


// router.get('/',  ctrl.getAll).post('/', validCreateContact, ctrl.createContact)

// router
//   .get('/:contactId', validObjectId, ctrl.getById)
//   .put('/:contactId', validUpdateContact, ctrl.updateContact)
//   .delete('/:contactId', ctrl.removeContact)
//   .patch('/:contactId', validObjectId, validUpdateContact, ctrl.updateContactPatch)

// router.patch('/:contactId/favorite', validObjectId, validUpdateFavoriteContact, ctrl.updateStatusContact)
