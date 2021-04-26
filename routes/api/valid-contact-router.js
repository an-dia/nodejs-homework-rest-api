const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

     email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org'] } }).required(),
     
     phone: Joi.string()
		.pattern(new RegExp("^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$"))
		.required()
})

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org'] } }).optional(),
     
  phone: Joi.string()
    .pattern(new RegExp("^\\([0-9]{3}\\) [0-9]{3}-[0-9]{4}$"))
    .optional()
}).or('name', 'email', 'phone')

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
  validCreateContact: async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next)
  },
   validUpdateContact: async (req, res, next) => {
    return await validate(schemaUpdateContact, req.body, next)
  },
}