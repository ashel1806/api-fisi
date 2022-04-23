import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import mongoose from 'mongoose'

import config from './utils/config.js'
import { requestLogger, unknowEndpoint, errorHandler } from './utils/middleware.js'
import logger from './utils/logger.js'

import { Courses } from './api/routes/index.js'
import { Teachers } from './api/routes/index.js'
import { Users } from './api/routes/index.js'
import { Login } from './api/routes/index.js'

const app = express()

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use(express.static('build'))

app.use('/api/cursos', Courses)
app.use('/api/profesores', Teachers)
app.use('/auth/register', Users)
app.use('/auth/login', Login)

app.use(unknowEndpoint)
app.use(errorHandler)

export default app