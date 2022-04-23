import logger from './logger.js'
import jwt from 'jsonwebtoken'

const requestLogger = (req, res, next) => {
  if (req) {
    logger.info('Method: ', req.method)
    logger.info('Path:   ', req.path)
    logger.info('Body:   ', req.body)
    logger.info('----')
    next()
  }
}

const unknowEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization && authorization.startsWith('bearer')) {
    req.token = authorization.split(' ')[1]
  }

  if (!req.token) {
    return res.status(401).json({
      error: 'Access Denied'
    })
  }

  const decoded = jwt.verify(req.token, process.env.SECRET)

  if (decoded) {
    req.user = decoded
    next()
  } else {
    res.status(400).json({
      error: 'token invalid'
    })
  }
}

export {
  requestLogger,
  unknowEndpoint,
  errorHandler,
  tokenExtractor
}