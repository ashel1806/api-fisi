const teachersRouter = require('express').Router()
const Teacher = require('../models/teacher')

teachersRouter.get('/', async (req, res) => {
  const teachers = await Teacher
    .find({}).populate('cursos')

  res.json(teachers.map(teacher => teacher.toJSON()))
})

teachersRouter.get('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id)

  if (teacher) {
    res.json(teacher.toJSON())
  } else {
    res.status(400).end()
  }
})

teachersRouter.post('/', async (req, res) => {
  const body = req.body

  const teacher = new Teacher({
    nombres: body.nombres,
    apellidos: body.apellidos,
    correo: body.correo,
    facultad: body.facultad
  })

  const savedTeacher = await teacher.save()
  res.json(savedTeacher.toJSON())
})

teachersRouter.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

teachersRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body

  const teacher = {
    nombres: body.nombres,
    apellidos: body.apellidos,
    correo: body.correo,
    facultad: body.facultad,
    cursos: body.cursos
  }

  const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, { new: true })
  res.json(updatedTeacher.toJSON())
})

module.exports = teachersRouter