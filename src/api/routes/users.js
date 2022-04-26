import { Router } from 'express'
import { UsersCtrl } from '../controllers/index.js'

const router = new Router()

router.route('/').post(UsersCtrl.apiPostUser)

export default router