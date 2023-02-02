import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import router from './routes/user.routes';
import { urlencoded, json } from 'body-parser';
const cors = require('cors');

export const app = express();

dotenv.config();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api', router);
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.status(500).json({ message: err.message });
    }
);

connection
    .sync()
    .then(() => {
        console.log('Database synced succesfully');
    })
    .catch((err) => {
        console.log('Err', err);
    });
