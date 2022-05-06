import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      unique: true,
      required: true,
  },

  name: {
    type: String,
    required: true,
  },

  photoURL: {
    type: String,
  },
  
  projects: [{
    name: {
      type: String,
    },
    description: {
      type: String,
    }
  }]

})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    for (let i = 0; i < returnedObject.projects.length; ++i){
      returnedObject.projects[i].id = returnedObject.projects[i]._id.toString()
      delete returnedObject.projects[i]._id
    }
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

export {User}