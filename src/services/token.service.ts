import userRouter from '../routes/user.routes';
import { Token } from './../db/models/token';
const jwt = require('jsonwebtoken');

class TokenService {
    generateTokens = (payload: any) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m',
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        });
        return { accessToken, refreshToken };
    };

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    saveToken = async (userId: number, refreshToken: string) => {
        const tokenData = await Token.findOne({
            where: { userId },
        });
        if (tokenData) {
            const token = await Token.update(
                { refreshToken: refreshToken },
                { where: { userId } }
            );
            return token;
        } else {
            const token = await Token.create({
                userId: userId,
                refreshToken: refreshToken,
            });
            return token;
        }
    };
    removeToken = async (refreshToken: string) => {
        const response = await Token.destroy({ where: { refreshToken } });
        return response;
    };
    findToken = async (refreshToken: string) => {
        const token = await Token.findOne({ where: { refreshToken } });
        return token;
    };
}

module.exports = new TokenService();
