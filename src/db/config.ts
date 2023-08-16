import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Log } from './models/log';
dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [Log],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        native: true,
    },
});

export default connection;
