const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    require: true
  },
  name: {
    type: String,
    minlength: 3,
    require: true,
  },
  passwordHash: String
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', schema)