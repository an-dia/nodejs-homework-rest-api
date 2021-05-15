const Users = require('../model/users')
const { HttpCode, Subscription } = require('../helper/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const registration = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already use'
    })
  }
  try {
    const newUser = await Users.createUser(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      }
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)
  const isValidPassword = await user?.validPassword(password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    })
  }
  const payload = { id: user.id }
  /* создаём token; sign-подписать */
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
  await Users.updateToken(user.id, token)
  return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {token},
    })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const  currentUser = async (req, res, next) => {
   try {
    const token = req.user.token;
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const { email, subscription } = await Users.findById(id);
    return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        user: {
                id, 
                email,
                subscription,
            },
      })
    } catch (e) {
      next(e)
    }
}

const updateUserSubscription  = async (req, res, next) => {
  try {
    const token = req.user.token;
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await Users.updateSubscription(id, req.body)
    if (user) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        user: {
                id: user.id, 
                email: user.email,
                subscription: user.subscription,
        },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const onlyStarter = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: `${Subscription.STARTER}`
    }
  })
}

const onlyPro = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: `${Subscription.PRO}`
    }
  })
}

const onlyBusiness = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      message: `${Subscription.BUSINESS}`
    }
  })
}

module.exports = {
  registration,
  login,
  logout,
  onlyStarter,
  onlyPro,
  onlyBusiness,
  currentUser,
  updateUserSubscription,
}