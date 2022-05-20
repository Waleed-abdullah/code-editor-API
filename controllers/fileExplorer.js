import { Router } from "express";
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra'
import multer from 'multer';
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

fileExplorerRouter.post('/createProjectsFolder', (req, res) => {
    const folderPath = pfp + req.body.userID + '/projects'
    
    fs.mkdir(folderPath, (err) => {
        if (err){
            if (err.code === 'EEXIST'){return res.status(200).json('Projects Folder Already Exists')}
            else {return res.status(404).json('Unsuccessful')}
        }
        return res.status(200).json('Projects Folder Created')
    })
})

fileExplorerRouter.post('/createSnippetsFolder', (req, res) => {
    const folderPath = pfp + req.body.userID + '/snippets'
    
    fs.mkdir(folderPath, (err) => {
        if (err){
            if (err.code === 'EEXIST'){return res.status(200).json('Snippets Folder Already Exists')}
            else {return res.status(404).json('Unsuccessful')}
        }
        return res.status(200).json('Snippets Folder Created')
    })
})

fileExplorerRouter.post('/createFolder', (req, res) => {
    const folderPath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + req.body.insidePath + '/' + req.body.folderName
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
    const dirPath = pfp + req.body.userID + '/' + req.body.type + '/' + req.body.dirName
    console.log(dirPath)
    
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

fileExplorerRouter.post('/createSnippetFile', (req, res) => {
    const filePath = pfp + req.body.userID + '/snippets/' + req.body.currProjectName + '/' + req.body.fileName

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

fileExplorerRouter.post('/createFile', (req, res) => {
    const filePath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + req.body.insidePath + '/' + req.body.fileName

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
    const filePath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + '/' + req.body.insidePath

    fs.writeFile(filePath, req.body.code,  (err) => {
        if (err) throw err;
        return res.status(200).json('Updated')
    });
})

fileExplorerRouter.post('/updateSnippet', (req, res) => {
    const filePath = pfp + req.body.userID + '/snippets/' + req.body.currentSnippetName + '/' + 'Snippet.' + req.body.language

    fs.writeFile(filePath, req.body.code, (err) => {
        if(err) throw err
        return res.status(200).json('Updated')
    })
})

fileExplorerRouter.post('/renameFile', (req, res) => {
    let oldPath;
    let newPath;

    oldPath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + '/' + req.body.insidePath
    
    const array = req.body.insidePath.split('/')
    let newInsidePath = ''
    for (let i=1; i < array.length-1; ++i){
        newInsidePath += '/' + array[i]
    }
    newInsidePath += '/' + req.body.newFileName

    newPath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + '/' + newInsidePath
    
    
    fs.rename(oldPath, newPath, err => {
        if (err) throw err
        return res.status(200).json('File Renamed')
    })
})

fileExplorerRouter.post('/deleteFile', (req, res) => {
    const filePath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + '/' + req.body.insidePath

    fs.unlink(filePath, (err) => {
        if (err) throw err
        console.log('Deleted File')
        return res.status(200).json('File Deleted')
    })
})

fileExplorerRouter.post('/deleteFolder', (req, res) => {
    const folderPath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + '/' + req.body.insidePath

    fs.rm(folderPath, { recursive: true, force: true }, (err) => {
        if (err) {throw err}
        console.log('Deleted Folder')
        return res.status(200).json('Folder Deleted')
    });
})

fileExplorerRouter.get('/getFiles/:userID/:currProjectDir', (req, res) => {
    const userID = req.params.userID
    const currProjectDir = req.params.currProjectDir
    const currPath = './public/' + userID + '/projects/' + currProjectDir
    const result = getFiles(currPath)
    return res.status(200).json({result})
})

fileExplorerRouter.get('/getContent', (req, res) => {
    const userID = req.query.userID
    const currProjectDir = req.query.currProjectDir
    const insidePath = req.query.insidePath
    const filePath = pfp + userID + '/projects/' + currProjectDir + '/' + insidePath

    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {throw err}
        return res.status(200).json({data})
    })  
})

fileExplorerRouter.get('/getSnippetContent', (req, res) => {
    const userID = req.query.userID
    const currentSnippetName = req.query.currentSnippetName
    const language = req.query.language
    const filePath = pfp + userID + '/snippets/' + currentSnippetName + '/' + 'Snippet.' + language;
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {throw err}
        return res.status(200).json({data})
    })
})

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/tmp/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage,
})

fileExplorerRouter.post('/uploadAsset', upload.single('file'), (req, res) => {
    if (!req.file){
        res.status(200).json('No File Uploaded')
    } 
    else{
        res.status(200).json('File Uploaded')
        console.log('Done')
    }
})

fileExplorerRouter.post('/move', (req, res) => {
    const oldPath = pfp + 'tmp' + '/' + req.body.fileName
    const newPath = pfp + req.body.userID + '/projects/' + req.body.currProjectName + '/' + req.body.insidePath + '/' + req.body.fileName
    
    fse.move(oldPath, newPath, (err) => {
        if (err) throw err;
        res.status(200).json('Moved')
    });  
})


export {fileExplorerRouter}