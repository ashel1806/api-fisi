import mongoose from 'mongoose'

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
  sylabus: String,
  categoria: {
    type: String,
    default: 'Sin categoría'
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Course = mongoose.model('Course', schema)

export default Course