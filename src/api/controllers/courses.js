import { Course } from '../models/index.js'
import { Teacher } from '../models/index.js'

export default class CoursesController {
  static async apiGetCourses(_, res, next) {
    const courses = await Course
      .find({}).populate('profesores', {
      nombres: 1, apellidos: 1, correo: 1, facultad: 1, imagen: 1
    })
  
    res.json(courses.map(course => course.toJSON()))
  }

  static async apiGetCourseById(req, res, next) {
    const course = await Course.findById(req.params.id).populate('profesores', {
      nombres: 1, apellidos: 1, correo: 1, facultad: 1
    })
  
    if (course) {
      res.json(course.toJSON())
    } else {
      res.status(404).end()
    }
  }
  
  static async apiPostCourse(req, res, next) {
    const body = req.body
    
    let teachers = await Promise.all(body.profesores.map(async id => {
      const teacher = await Teacher.findById(id)
      return teacher
    }))

    const course = new Course({
      nombre: body.nombre,
      profesores: teachers.map(t => t.id),
      ciclo: body.ciclo,
      creditos: body.creditos || 0,
      sylabus: body.sylabus,
      categoria: body.categoria
    })

    const savedCourse = await course.save()
    teachers = teachers.map(teacher => {
      teacher.cursos = teacher.cursos.concat(savedCourse.id)
      return teacher
    })
    console.log(teachers)
    await Promise.all(teachers.map(async t => await t.save()))

    res.json(savedCourse.toJSON())
  }

  static async apiDeleteCourse(req, res, next) {
    await Course.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }

  static async apiUpdateCourse(req, res, next) {
    const id = req.params.id
    const body = req.body

    const course = {
      nombre: body.nombre,
      profesores: body.profesores,
      sylabus: body.sylabus,
      creditos: body.creditos,
      ciclo: body.ciclo,
      categoria: body.categoria
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true })
    res.json(updatedCourse.toJSON())
  }

  static async apiGetCoursesByCategory(req, res, next) {
    const courses = await Course.find({ categoria: req.params.categoria })

    res.json(courses.map(course => course.toJSON()))
  }
}