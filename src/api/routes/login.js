import { Router } from 'express'
import { LoginCtrl } from '../controllers/index.js'

const router = new Router()

router.route('/').post(LoginCtrl.apiPostLogin)

export default router