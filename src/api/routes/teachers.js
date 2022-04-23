import { Router } from 'express'
import { TeachersCtrl } from '../controllers/index.js'
import { tokenExtractor } from '../../utils/middleware.js'

const router = new Router()

// Public routes
router.route('/').get(TeachersCtrl.apiGetTeachers)
router.route('/:id').get(TeachersCtrl.apiGetTeacherById)

// Using middleware for protect routes
router.use(tokenExtractor)

// Protected routes
router.route('/').post(TeachersCtrl.apiPostTeacher)

router.route('/:id')
  .put(TeachersCtrl.apiUpdateTeacher)
  .delete(TeachersCtrl.apiDeleteTeacher)

export default router
