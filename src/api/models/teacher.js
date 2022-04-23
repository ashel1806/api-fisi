import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
    minlength: 5,
  },
  apellidos: {
    type: String,
    minlength: 3
  },
  correo: {
    type: String,
    minlength: 5,
    match: /.+\@.+\..+/
  },
  facultad: {
    type: String,
    minlength: 2,
  },
  imagen: {
    type: String,
    default: 'https://res.cloudinary.com/ashel-root/image/upload/v1642319099/Profesores/default_fvdimb.jpg'
  },
  cursos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Teacher = mongoose.model('Teacher', schema)

export default Teacher