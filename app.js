const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const boolParser = require('express-query-boolean')
const rateLimit = require("express-rate-limit")
const { HttpCode } = ('./helper/constants.js')

const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.get('env') !== 'test' && app.use(logger(formatsLogger))
app.use(express.static('public'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
     return res.status(HttpCode.MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.MANY_REQUESTS,
      message: 'Too many Requests'
    })
  }
})

//  apply to all requests
app.use(limiter);
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
app.use(express.json())
app.use(boolParser())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not Found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({
    status: status === 500 ? 'fail' : 'error',
    code: status,
    message: err.message
  })
})

module.exports = app
