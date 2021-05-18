const Joi = require('joi')
const { Subscription, HttpCode } = require('../../helper/constants')

const schemaCreateUser = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .pattern(/[A-Z]\w+/)
        .required(),

     email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org'] } }).required(),
     
     password: Joi.string()
       .pattern(/^[a-zA-Z0-9]+/)
       .required(),
     
     subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .optional()
})

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'org'] } })
    .required(),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]+/)
    .required(),
})

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .required(),
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    return next()
}
  catch (err) {
    console.log(err)
    next({status: HttpCode.BAD_REQUEST, message: err.message.replace(/"/g, "'")})
 }
}

module.exports = {
  validCreateUser: async (req, res, next) => {
    return await validate(schemaCreateUser, req.query, next)
  },
  validLogin: async (req, res, next) => {
    return await validate(schemaLogin, req.body, next)
  },
   validUpdateSubscription: async (req, res, next) => {
    return await validate(schemaUpdateSubscription, req.body, next)
  },
}