const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const coursesRouter = require('./controllers/courses')
const teachersRouter = require('./controllers/teachers')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.err('error connecting to MongoDB', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/cursos', coursesRouter)
app.use('/api/profesores', teachersRouter)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)

module.exports = app