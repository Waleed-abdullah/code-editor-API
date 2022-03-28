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
        if (newArray[i].length != 1){
            if (seenFolder[newArray[i][0]]){
                seenFolder[newArray[i][0]].push(newArray[i])
            }
            else{
                seenFolder[newArray[i][0]] = []
                seenFolder[newArray[i][0]].push(newArray[i])
            }
        }
        else{
            rootFiles.push(newArray[i][0])
        }
    }

    console.log(seenFolder)
    console.log(rootFiles)
    return {seenFolder, rootFiles}
}

export {getFiles}