import express, { json } from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve()
const pfp = __dirname + '/public/'
const app = express();
app.use(json());
app.use(cors());

app.post('/fileExplorer/createUserFolder', (req, res) => {
    const dirPath = pfp + req.body.userID

    fs.mkdir(dirPath, (err) => {
        if (err){
            if (err.code === 'EEXIST'){return res.status(200).json('Folder Already Exists')}
            else {return res.status(404).json('Unsuccessful')}
        }
        return res.status(200).json('New Folder Created')
    })
})

app.post('/fileExplorer/createProjectDir', (req, res) => {
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

app.post('/fileExplorer/createFile', (req, res) => {
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

app.post('/fileExplorer/updateCode', (req, res) => {
    const filePath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.currFileName

    fs.writeFile(filePath, req.body.code,  (err) => {
        if (err) throw err;
        return res.status(200).json('Updated')
    });
})

app.post('/fileExplorer/renameFile', (req, res) => {
    const oldPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.currFileName
    const newPath = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.newFileName

    fs.rename(oldPath, newPath, err => {
        if (err) throw err
        return res.status(200).json('File Renamed')
    })
})

app.post('/fileExplorer/deleteFile', (req, res) => {
    const path = pfp + req.body.userID + '/' + req.body.currProjectName + '/' + req.body.fileName

    fs.unlink(path, (err) => {
        if (err) throw err
        return res.status(200).json('File Deleted')    
    })
})

app.use('/get', express.static(path.join(__dirname, '/public')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at localhost:${port}`));
