"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("./models/users");
const dotenv_1 = __importDefault(require("dotenv"));
const collections_1 = require("./models/collections");
const tags_1 = require("./models/tags");
const items_1 = require("./models/items");
const comments_1 = require("./models/comments");
const item_configs_1 = require("./models/item_configs");
const user_access_1 = require("./models/user_access");
const token_1 = require("./models/token");
dotenv_1.default.config();
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [users_1.User, collections_1.Collection, items_1.Item, comments_1.Comment, tags_1.Tag, item_configs_1.Config, user_access_1.Access, token_1.Token],
    dialectOptions: {
        ssl: true,
        native: true,
    },
});
exports.default = connection;
