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
        console.log('Deleted')
        return res.status(200).json('File Deleted')    
    })
})

fileExplorerRouter.get('/getFiles', (req, res) => {
    // const getAllFiles = function(dirPath, arrayOfFiles) {
    //     const files = fs.readdirSync(dirPath)
      
    //     arrayOfFiles = arrayOfFiles || []
      
    //     files.forEach(function(file) {
    //       if (fs.statSync(dirPath + "/" + file).isDirectory()) {
    //         arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    //       } else {
    //         arrayOfFiles.push(path.join(dirPath, "/", file))
    //       }
    //     })
      
    //     return arrayOfFiles
    // }

    // //const path = pfp + req.body.userID + '/' + req.body.currProjectName
    // const result = getAllFiles('./public/abd/TestDir', [])

    // const newArray = []

    // for (let j = 0; j < result.length; ++j){
    //     newArray.push([])
    //     const file = result[j].split('\\')
    //     for (let i = 3; i < file.length; ++i){
    //         newArray[j].push(file[i])
    //     }
    // }
    // console.log(newArray)

    const result = getFiles('./public/abd/TestDir')
    return res.status(200).json('Files Gottem')
})

export {fileExplorerRouter}