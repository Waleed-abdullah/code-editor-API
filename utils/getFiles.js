import fs from 'fs'
import path from 'path'

const getFiles = (pathToDir) => {
    const recursiveGetAllFiles = function(dirPath, arrayOfFiles) {
        const files = fs.readdirSync(dirPath)
      
        arrayOfFiles = arrayOfFiles || []
      
        files.forEach(function(file) {
          if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = recursiveGetAllFiles(dirPath + "/" + file, arrayOfFiles)
          } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
          }
        })
        if (files.length === 0){arrayOfFiles.push(path.join(dirPath + '?'))}
      
        return arrayOfFiles
    }

    const result = recursiveGetAllFiles(pathToDir, [])

    const newArray = []

    for (let j = 0; j < result.length; ++j){
        newArray.push([])
        const file = result[j].split('\\')
        for (let i = 3; i < file.length; ++i){
            newArray[j].push(file[i])
        }
    }

    const seenFolder = {}
    const rootFiles = []
    for (let i = 0; i < newArray.length; ++i){
        if (newArray[i].length != 1 && newArray[i][0][newArray[i][0].length-1] !== '?'){
            if (seenFolder[newArray[i][0]]){
                seenFolder[newArray[i][0]].push(newArray[i])
            }
            else{
                seenFolder[newArray[i][0]] = []
                seenFolder[newArray[i][0]].push(newArray[i])
            }
        }
        else{
            const emptyFolder = newArray[i][0][newArray[i][0].length-1] === '?' ? true : false
            if (emptyFolder){
              seenFolder[newArray[i][0].split('?')[0]] = []
              seenFolder[newArray[i][0].split('?')[0]].push(newArray[i])
            }
            else{
              rootFiles.push(newArray[i][0])
            }
        }
    }
    return {seenFolder, rootFiles}
}

export {getFiles}