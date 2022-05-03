import { Router } from 'express'
import { User } from '../models/userModel.js'

const userRouter = Router()

userRouter.post('/createUser', async (req, res) => {
    const userFound = await User.find({email: req.body.email})

    if (!userFound.length){
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            projects : [] // TODO: change this
        })

        const savedUser = await user.save()   
        return res.status(200).json(savedUser)
    }
    else{
        return res.status(200).json(userFound[0])
    }
})


export {userRouter}