const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
})

mongoose.connection.on('connected', () => {
  console.log(`Database connection successful`)
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose error: ${err.message}`)
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
})

// Событие ctrl+c
process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection to DB closed and app termination')
    process.exit(1)
  })
})

module.exports = db