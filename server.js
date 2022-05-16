import express, { json } from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import {fileExplorerRouter} from './controllers/fileExplorer.js'
import {userRouter} from './controllers/userController.js'
import { codeRouter } from './controllers/codeRouter.js';

// connecting to mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
})

const __dirname = path.resolve()
const pfp = __dirname + '/public'
const app = express();

app.use(json({limit: '50mb'}));
app.use(cors());

app.use('/get', express.static(pfp));

app.use('/user', userRouter)
app.use('/fileExplorer', fileExplorerRouter)
app.use('/code', codeRouter)

// app.get('/runCode', (req, res) => {
//   const data = {
//     "files": [
//       {
//         "name": "main.rs",
//         "content": `
//         fn main() {
//           // Statements here are executed when the compiled binary is called
      
//           // Print text to the console
//           println!("Hello World!");
//           println!("Hello Rust");
//         }`
//       }
//     ]
//   }

//   axios.post('https://run.glot.io/languages/rust/latest', data, {
//     headers: {
//       Authorization: `Token 07016bea-5df6-4613-b545-33d9f557657f`,
//       'Content-type': `application/json`
//     }
//   }).then(res => console.log(res))

//   return res.status(200).json('Done')
// })


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at localhost:${port}`));

// #include <iostream>

// int main() {
//     // Write C++ code here
//     std::cout << "Hello world!";

//     return 0;
// }