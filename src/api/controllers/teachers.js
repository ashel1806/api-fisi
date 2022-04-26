import { Teacher } from '../models/index.js'
import cloudinary from '../../utils/cloudinary.config.js'

export default class TeachersController {
  static async apiGetTeachers(req, res, next) {
    const teachers = await Teacher
      .find({}).populate('cursos', {
        nombre: 1, creditos: 1, ciclo: 1, sylabus: 1, categoria: 1
      })

    res.json(teachers.map(teacher => teacher.toJSON()))
  }

  static async apiGetTeacherById(req, res, next) {
    const teacher = await Teacher.findById(req.params.id).populate('cursos', {
      nombre: 1, creditos: 1, ciclo: 1, sylabus: 1
    })
  
    if (teacher) {
      res.json(teacher.toJSON())
    } else {
      res.status(400).end()
    }
  }

  static async apiPostTeacher(req, res, next) {
    const body = req.body
    // console.log(req);

    const imageInfo = await cloudinary.uploader.upload(req.file.path)

    const teacher = new Teacher({
      nombres: body.nombres,
      apellidos: body.apellidos,
      correo: body.correo,
      facultad: body.facultad,
      imagen: imageInfo.secure_url
    })

    const savedTeacher = await teacher.save()
    res.json(savedTeacher.toJSON())
  }

  static async apiUpdateTeacher(req, res, next) {
    const id = req.params.id
    const body = req.body

    let newImageInfo
    if (req.file) {
      newImageInfo = await cloudinary.uploader.upload(req.file.path)
    }

    const imageUrl = newImageInfo ? newImageInfo.secure_url : body.imagen

    const teacher = {
      nombres: body.nombres,
      apellidos: body.apellidos,
      correo: body.correo,
      facultad: body.facultad,
      imagen: imageUrl
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, { new: true })
    res.json(updatedTeacher.toJSON())
  }

  static async apiDeleteTeacher(req, res, next) {
    await Teacher.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
}