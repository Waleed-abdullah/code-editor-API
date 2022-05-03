import express, { json } from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import {fileExplorerRouter} from './controllers/fileExplorer.js'
import {userRouter} from './controllers/userController.js'

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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at localhost:${port}`));
