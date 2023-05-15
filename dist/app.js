"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const collection_routes_1 = __importDefault(require("./routes/collection.routes"));
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const dev_routes_1 = require("./routes/dev.routes");
const body_parser_1 = require("body-parser");
const collection_utils_1 = require("./utils/collection.utils");
const mainSocket_1 = require("./socket/mainSocket");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error-middleware');
const authMiddleware = require('./middleware/auth-middleware');
const http = require('http');
exports.app = (0, express_1.default)();
exports.server = http.createServer(exports.app);
const Socket = new mainSocket_1.MainSocket(exports.server);
dotenv_1.default.config();
exports.app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
exports.app.use((0, body_parser_1.json)());
exports.app.use(cookieParser());
exports.app.use((0, body_parser_1.urlencoded)({ extended: true }));
exports.app.use('/user', user_routes_1.default);
exports.app.use('/collection', collection_routes_1.default);
exports.app.use('/item', item_routes_1.default);
exports.app.use('/dev', dev_routes_1.devRouter);
// app.use(authMiddleware);
Socket.onEvents();
config_1.default
    .sync({ force: true })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, collection_utils_1.deleteAllIndexes)('collections');
    (0, collection_utils_1.deleteAllIndexes)('items');
    (0, collection_utils_1.themeCheck)();
    console.log('Database synced successfully');
}))
    .catch((err) => {
    console.log('Err', err);
});
