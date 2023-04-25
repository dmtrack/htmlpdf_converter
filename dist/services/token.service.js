"use strict";
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
        this.saveToken = async (userId, refreshToken) => {
            const tokenData = await token_1.Token.findOne({
                where: { userId },
            });
            if (tokenData) {
                const token = await token_1.Token.update({ refreshToken: refreshToken }, { where: { userId } });
                return token;
            }
            else {
                const token = await token_1.Token.create({
                    userId: userId,
                    refreshToken: refreshToken,
                });
                return token;
            }
        };
        this.removeToken = async (refreshToken) => {
            const response = await token_1.Token.destroy({ where: { refreshToken } });
            return response;
        };
        this.findToken = async (refreshToken) => {
            const token = await token_1.Token.findOne({ where: { refreshToken } });
            return token;
        };
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
