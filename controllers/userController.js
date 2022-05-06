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

userRouter.post('/createProject', async (req, res) => {
    // get user data
    const userInfo = await User.findById({_id: req.body.id})
    // seperate projects lists
    const projectLists = userInfo.projects

    // check whether name of project already exists
    let n = req.body.projectInfo.name
    let found = projectLists.find((p) => p.name === n)
    let c = 0
    while(found) {
        n = req.body.projectInfo.name + '(' + c.toString() + ')'
        c++
        found = projectLists.find((p) => p.name === n)
    }

    // push new project to projects list
    projectLists.push({name: n, description: req.body.projectInfo.description})
    
    // update in database
    const updatedUser = await User.findByIdAndUpdate({_id: req.body.id}, {projects: projectLists}, {new: true})
    return res.status(200).json({updatedUser: updatedUser, dirName: n})
})


export {userRouter}