import express, { json } from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import path from 'path';

import {fileExplorerRouter} from './controllers/fileExplorer.js'

const __dirname = path.resolve()
const pfp = __dirname + '/public'
const app = express();

app.use(json({limit: '50mb'}));
app.use(cors());

app.use('/get', express.static(pfp));

app.use('/fileExplorer', fileExplorerRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at localhost:${port}`));
