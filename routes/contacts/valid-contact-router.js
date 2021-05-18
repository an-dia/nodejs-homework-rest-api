const Joi = require('joi')
const mongoose = require('mongoose') 

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

     email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org'] } }).required(),
     
     phone: Joi.string()
       .pattern(/^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+-? ?\d+-? ?\d+)$/)
      //  /^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+\-? ?\d+\-? ?\d+)$/
    .required(),
     
     favorite: Joi.boolean().optional(),
})

const schemaQueryContact = Joi.object({
    sortBy: Joi.string().valid('name', 'email', 'phone', 'id').optional(),
    sortByDesc: Joi.string().valid('name', 'email', 'phone', 'id').optional(),
    filter: Joi.string().optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
    offset: Joi.number().integer().min(0).optional(),
    favorite: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc')

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org'] } }).optional(),
     
  phone: Joi.string()
    .pattern(/^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+-? ?\d+-? ?\d+)$/)
    .optional(),
  
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().optional(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
}
  catch (err) {
    console.log(err)
    next({status: 400, message: err.message.replace(/"/g, "'")})
 }
}

module.exports = {
  validQueryContact: async (req, res, next) => {
    return await validate(schemaQueryContact, req.query, next)
  },
  validCreateContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next)
  },
   validUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  },
   validUpdateFavoriteContact: async (req, res, next) => {
    return await validate(schemaUpdateStatusContact, req.body, next)
  },
  validObjectId: async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
        return next({status: 400, message: 'Invalid Object Id'})
    }
    next() 
  },
}