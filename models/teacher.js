const mongoose = require('mongoose')

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

module.exports = mongoose.model('Teacher', schema)