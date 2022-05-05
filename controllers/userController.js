import { Router } from 'express'
import { User } from '../models/userModel.js'

const userRouter = Router()

userRouter.post('/createUser', async (req, res) => {
    const userFound = await User.find({email: req.body.user.email})

    if (!userFound.length){
        const user = new User({
            name: req.body.user.name.replaceAll(' ', '-'),
            email: req.body.user.email,
            photoURL: req.body.user.photoURL,
            projects : [] // TODO: change this
        })

        const savedUser = await user.save()
        return res.status(200).json({savedUser: savedUser, userExisted: false})
    }
    else{
        return res.status(200).json({savedUser: userFound[0], userExisted: true})
    }
})


export {userRouter}