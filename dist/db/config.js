'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const stringfield_1 = require('./models/field_types/stringfield');
const sequelize_typescript_1 = require('sequelize-typescript');
const user_1 = require('./models/user');
const dotenv_1 = __importDefault(require('dotenv'));
const collection_1 = require('./models/collection');
const tag_item_1 = require('./models/tag_item');
const item_1 = require('./models/item');
const comment_1 = require('./models/comment');
const field_1 = require('./models/field');
const fieldtype_1 = require('./models/fieldtype');
const user_access_1 = require('./models/user_access');
const token_1 = require('./models/token');
const textfield_1 = require('./models/field_types/textfield');
const booleanfield_1 = require('./models/field_types/booleanfield');
const datefield_1 = require('./models/field_types/datefield');
const numfield_1 = require('./models/field_types/numfield');
const theme_1 = require('./models/theme');
const like_1 = require('./models/like');
dotenv_1.default.config();
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [
        user_1.User,
        collection_1.Collection,
        item_1.Item,
        comment_1.Comment,
        tag_item_1.TagItem,
        field_1.Field,
        fieldtype_1.FieldType,
        user_access_1.Access,
        token_1.Token,
        stringfield_1.StringField,
        textfield_1.TextField,
        booleanfield_1.BooleanField,
        datefield_1.DateField,
        numfield_1.NumField,
        theme_1.Theme,
        like_1.Like,
    ],
    dialectOptions: {
        ssl: true,
        native: true,
    },
});
exports.default = connection;
