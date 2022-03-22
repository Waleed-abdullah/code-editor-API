import { Router } from "express";
import path from 'path';
import fs from 'fs';

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
    const filePath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.fileName;

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
    const oldPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.currFileName
    const newPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.newFileName

    fs.rename(oldPath, newPath, err => {
        if (err) throw err
        return res.status(200).json('File Renamed')
    })
})

fileExplorerRouter.post('/deleteFile', (req, res) => {
    const path = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.fileName

    fs.unlink(path, (err) => {
        if (err) throw err
        return res.status(200).json('File Deleted')    
    })
})

export {fileExplorerRouter}