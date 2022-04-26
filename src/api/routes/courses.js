import { Router } from 'express'
import { CoursesCtrl } from '../controllers/index.js'
import { tokenExtractor } from '../../utils/middleware.js'

const router = new Router()

// Public routes
router.route('/').get(CoursesCtrl.apiGetCourses)
router.route('/:id').get(CoursesCtrl.apiGetCourseById)
router.route('/categoria/:categoria').get(CoursesCtrl.apiGetCoursesByCategory)

// Using middleware for protect routes
router.use(tokenExtractor)

// Protected routes
router.route('/').post(CoursesCtrl.apiPostCourse)

router.route('/:id')
  .put(CoursesCtrl.apiUpdateCourse)
  .delete(CoursesCtrl.apiDeleteCourse)

export default router