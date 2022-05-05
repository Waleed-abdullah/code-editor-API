import { Router } from 'express'
import { User } from '../models/userModel.js'

const userRouter = Router()

userRouter.post('/createUser', async (req, res) => {
    const userFound = await User.find({email: req.body.user.email})

    if (!userFound.length){
        const user = new User({
            name: req.body.user.name.replaceAll(' ', '-'),
            email: req.body.user.email,
            projects : [] // TODO: change this
        })

        const savedUser = await user.save()
        console.log(savedUser)
        return res.status(200).json(savedUser)
    }
    else{
        console.log(userFound[0])
        return res.status(200).json(userFound[0])
    }
})


export {userRouter}