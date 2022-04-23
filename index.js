import http from 'http'

import logger from './src/utils/logger.js'
import config from './src/utils/config.js'

import app from './src/app.js'


const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`);
})