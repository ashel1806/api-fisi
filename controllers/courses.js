const coursesRouter = require('express').Router()
const Course = require('../models/course')
const Teacher = require('../models/teacher')

coursesRouter.get('/', async (req, res) => {
  const courses = await Course
    .find({}).populate('profesores')
  
  res.json(courses.map(course => course.toJSON()))
})

coursesRouter.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    res.json(course.toJSON())
  } else {
    res.status(404).end()
  }
})

coursesRouter.post('/', async (req, res) => {
  const body = req.body

  let teachers = await Promise.all(body.profesores.map(async id => {
    const teacher = await Teacher.findById(id)
    return teacher
  }))

  const course = new Course({
    nombre: body.nombre,
    profesores: teachers.map(t => t._id),
    ciclo: body.ciclo,
    creditos: body.creditos || 0,
    sylabus: body.sylabus
  })

  const savedCourse = await course.save()
  teachers = teachers.map(teacher => {
    teacher.cursos = teacher.cursos.concat(savedCourse._id)
    return teacher
  })
  await Promise.all(teachers.map(async t => await t.save()))

  res.json(savedCourse.toJSON())
})

coursesRouter.delete('/:id', async (req, res) => {
  await Course.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

coursesRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const course = {
    nombre: body.nombre,
    profesores: body.profesores,
    creditos: body.creditos,
    ciclo: body.ciclo
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, course, { new: true })
  res.json(updatedCourse.toJSON())
})

module.exports = coursesRouter