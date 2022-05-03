import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      unique: true
  },
  name: String,
  projects: [
      {
          type: String,
      }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

export {User}