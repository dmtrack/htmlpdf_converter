import { StringField } from './models/field_types/stringfield';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';
import dotenv from 'dotenv';
import { Collection } from './models/collection';
import { TagItem } from './models/tag_item';
import { Item } from './models/item';
import { Comment } from './models/comment';
import { Field } from './models/field';
import { FieldType } from './models/fieldtype';
import { Access } from './models/user_access';
import { Token } from './models/token';
import { TextField } from './models/field_types/textfield';
import { BooleanField } from './models/field_types/booleanfield';
import { DateField } from './models/field_types/datefield';
import { NumField } from './models/field_types/numfield';
import { Theme } from './models/theme';
import { Like } from './models/like';
dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [
        User,
        Collection,
        Item,
        Comment,
        TagItem,
        Field,
        FieldType,
        Access,
        Token,
        StringField,
        TextField,
        BooleanField,
        DateField,
        NumField,
        Theme,
        Like,
    ],
    // dialectOptions: {
    //     ssl: true,
    //     native: true,
    // },
});

export default connection;
