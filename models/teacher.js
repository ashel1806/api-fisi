const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

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
  telefono: {
    type: String,
    minlength: 9,
    unique: true
  },
  correo: {
    type: String,
    minlength: 5,
    unique: true,
    match: /.+\@.+\..+/
  },
  facultad: {
    type: String,
    minlength: 2,
    unique: true
  },
  cursos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Teacher', schema)