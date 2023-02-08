import { Sequelize } from 'sequelize-typescript';
import { User } from './models/users';
import dotenv from 'dotenv';
import { Collection } from './models/collections';
import { Tag } from './models/tags';
import { Item } from './models/items';
import { Comment } from './models/comments';
import { Config } from './models/item_configs';
import { Access } from './models/user_access';
import { Token } from './models/token';
dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [User, Collection, Item, Comment, Tag, Config, Access, Token],
    dialectOptions: {
        ssl: true,
        native: true,
    },
});

export default connection;
