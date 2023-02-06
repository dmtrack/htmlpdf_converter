import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import collectionRouter from './routes/collection.routes';
import itemRouter from './routes/item.routes';
import { urlencoded, json } from 'body-parser';
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware');
export const app = express();

dotenv.config();
app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/api/user', userRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/item', itemRouter);
app.use(errorHandlingMiddleware);

connection
    .sync({ force: true })
    .then(() => {
        console.log('Database synced succesfully');
    })
    .catch((err) => {
        console.log('Err', err);
    });
