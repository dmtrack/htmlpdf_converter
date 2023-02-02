"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const body_parser_1 = require("body-parser");
const cors = require('cors');
exports.app = (0, express_1.default)();
dotenv_1.default.config();
exports.app.use(cors());
exports.app.use((0, body_parser_1.json)());
exports.app.use((0, body_parser_1.urlencoded)({ extended: true }));
exports.app.use('/api', user_routes_1.default);
exports.app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
config_1.default
    .sync()
    .then(() => {
    console.log('Database synced succesfully');
})
    .catch((err) => {
    console.log('Err', err);
});
