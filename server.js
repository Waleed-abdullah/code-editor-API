import express, { json } from 'express';
import {} from 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening at localhost:${port}`));
