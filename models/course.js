const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 5,
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
  sylabus: String
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Course', schema)