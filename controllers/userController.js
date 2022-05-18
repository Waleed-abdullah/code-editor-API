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
            projects : [], // TODO: change this
            snippets: []
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
    // seperate lists
    const projectLists = req.body.projectInfo.type === 'projects' ? userInfo.projects : userInfo.snippets
    // check whether name of project already exists
    let n = req.body.projectInfo.name.replaceAll(' ', '-')
    let found = projectLists.find((p) => p.name === n)
    let c = 0
    while(found) {
        n = req.body.projectInfo.name.replaceAll(' ', '-') + '(' + c.toString() + ')'
        c++
        found = projectLists.find((p) => p.name === n)
    }

    // push new project to projects list
    if (req.body.projectInfo.type === 'projects'){projectLists.push({name: n, description: req.body.projectInfo.description, creationDate: new Date()})}
    else {projectLists.push({name: n, description: req.body.projectInfo.description, creationDate: new Date(), language: req.body.projectInfo.language})}
    
    
    // update in database
    const updatedUser = req.body.projectInfo.type === 'projects' ? await User.findByIdAndUpdate({_id: req.body.id}, {projects: projectLists}, {new: true}) : 
        await User.findByIdAndUpdate({_id: req.body.id}, {snippets: projectLists}, {new: true})
    return res.status(200).json({updatedUser: updatedUser, dirName: n})
})

userRouter.get('/getUsers', async (req, res) => {
    let usersFound = await User.find({})
    usersFound = usersFound.filter(user => user.name.includes(req.query.query))
    return res.status(200).json({usersFound})
})

userRouter.get('/getUser', async (req, res) => {
    const userFound = await User.findById({_id: req.query.id})
    return res.status(200).json({userFound})
})


export {userRouter}