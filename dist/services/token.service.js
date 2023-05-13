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
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./../db/models/token");
const jwt = require('jsonwebtoken');
class TokenService {
    constructor() {
        this.generateTokens = (payload) => {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
                expiresIn: '30m',
            });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: '30d',
            });
            return { accessToken, refreshToken };
        };
        this.saveToken = (userId, refreshToken) => __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_1.Token.findOne({
                where: { userId },
            });
            if (tokenData) {
                const token = yield token_1.Token.update({ refreshToken: refreshToken }, { where: { userId } });
                return token;
            }
            else {
                const token = yield token_1.Token.create({
                    userId: userId,
                    refreshToken: refreshToken,
                });
                return token;
            }
        });
        this.removeToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            const response = yield token_1.Token.destroy({ where: { refreshToken } });
            return response;
        });
        this.findToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            const token = yield token_1.Token.findOne({ where: { refreshToken } });
            return token;
        });
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
}
module.exports = new TokenService();
