const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  profesores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  ],
  creditos: {
    type: Number,
    required: true
  },
  ciclo: {
    type: Number,
    required: true
  },
  sylabus: {
    type: String,
    unique: true,
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Course', schema)