const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/users')
const guard = require('../../helper/guard')
const rateLimit = require("express-rate-limit")
const role = require('../../helper/role')
const { Subscription } = require('../../helper/constants')
const {validCreateUser, validLogin, validUpdateSubscription} = require('./valid-user-router')

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 2, // limit each IP to 2 requests per windowMs
  handler: (req, res, next) => {
     return res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too many Requests'
    })
  }
})

router.post('/register', validCreateUser, limiter, ctrl.registration)
router.post('/login', validLogin, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.get('/current', guard, ctrl.currentUser)
router.patch('/', guard, validUpdateSubscription, ctrl.updateUserSubscription)

router.get('/starter', guard, role(Subscription.STARTER), ctrl.onlyStarter)
router.get('/pro', guard, role(Subscription.PRO), ctrl.onlyPro)
router.get('/business', guard, role(Subscription.BUSINESS), ctrl.onlyBusiness)

module.exports = router
