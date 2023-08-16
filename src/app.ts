import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import fileRouter from './routes/file.routes';
import { urlencoded, json } from 'body-parser';
const cors = require('cors');
const http = require('http');
export const app = express();
export const server = http.createServer(app);

dotenv.config();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/file', fileRouter);

connection
    .sync({ force: true })
    .then(async () => {
        console.log('Database synced successfully, lets go!');
    })
    .catch((err) => {
        console.log('Err', err);
    });
