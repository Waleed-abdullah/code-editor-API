import { Router } from "express";
import path from 'path';
import fs from 'fs';
import { getFiles } from "../utils/getFiles.js";

const __dirname = path.resolve();
const pfp = path.join(__dirname + '/public/')
const fileExplorerRouter = Router()

fileExplorerRouter.post('/createUserFolder', (req, res) => {
    const dirPath = pfp + req.body.userID

    fs.mkdir(dirPath, (err) => {
        if (err){
            if (err.code === 'EEXIST'){return res.status(200).json('Folder Already Exists')}
            else {return res.status(404).json('Unsuccessful')}
        }
        return res.status(200).json('New Folder Created')
    })
})

fileExplorerRouter.post('/createFolder', (req, res) => {
    const folderPath = pfp + req.body.userID + '/' + req.body.currProjectName + req.body.insidePath + '/' + req.body.folderName
    console.log(folderPath)
    fs.mkdir(folderPath, (err) => {
        if (err){
            if (err.code === 'EEXIST'){return res.status(200).json('Folder Already Exists')}
            else {return res.status(404).json('Unsuccessful')}
        }
        return res.status(200).json('New Folder Created')
    })
})

fileExplorerRouter.post('/createProjectDir', (req, res) => {
    const dirPath = pfp + req.body.userID + '/' + req.body.dirName
    
    fs.mkdir(dirPath, (err) => {
        if (err) {
            if (err.code === 'EEXIST'){
                return res.status(200).json('Folder Already Exists')
            }
            else {
                return res.status(404).json('Unsuccessful')
            }
        }
        return res.status(200).json('New Project Created')
    })
})

fileExplorerRouter.post('/createFile', (req, res) => {
    const filePath = pfp + req.body.userID + '/' + req.body.currProjectName + req.body.insidePath + '/' + req.body.fileName

    fs.open(filePath, 'w', (err, file) => {
        if (err) {
            if (err.code === 'EEXIST'){
                return res.status(200).json('File Already Exists')
            }
            else {
                return res.status(404).json('Unsuccessful')
            }
        }
        return res.status(200).json('File Created')
    });
})

fileExplorerRouter.post('/updateCode', (req, res) => {
    const filePath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.currFileName

    fs.writeFile(filePath, req.body.code,  (err) => {
        if (err) throw err;
        return res.status(200).json('Updated')
    });
})

fileExplorerRouter.post('/renameFile', (req, res) => {
    const oldPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.insidePath
    
    const array = req.body.insidePath.split('/')
    let newInsidePath = ''
    for (let i=1; i < array.length-1; ++i){
        newInsidePath += '/' + array[i]
    }
    newInsidePath += '/' + req.body.newFileName

    const newPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + newInsidePath

    fs.rename(oldPath, newPath, err => {
        if (err) throw err
        return res.status(200).json('File Renamed')
    })
})

fileExplorerRouter.post('/deleteFile', (req, res) => {
    const filePath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.insidePath

    fs.unlink(filePath, (err) => {
        if (err) throw err
        console.log('Deleted File')
        return res.status(200).json('File Deleted')
    })
})

fileExplorerRouter.post('/deleteFolder', (req, res) => {
    const folderPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.insidePath

    fs.rm(folderPath, { recursive: true, force: true }, (err) => {
        if (err) {throw err}
        console.log('Deleted Folder')
        return res.status(200).json('Folder Deleted')
    });
})

fileExplorerRouter.get('/getFiles/:userID/:currProjectDir', (req, res) => {
    const userID = req.params.userID
    const currProjectDir = req.params.currProjectDir
    const currPath = './public/' + userID + '/' + currProjectDir
    const result = getFiles(currPath)
    return res.status(200).json({result})
})

export {fileExplorerRouter}