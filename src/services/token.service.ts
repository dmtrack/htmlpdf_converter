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
    saveToken = async (userId: number, refreshToken: string) => {
        const tokenData = await Token.findOne({
            where: { id: userId },
        });
        if (tokenData) {
            await Token.update(
                { refreshToken: refreshToken },
                { where: { id: userId } }
            );
        }
        const token = await Token.create({
            userId: userId,
            refreshToken: refreshToken,
        });
        return token;
    };
}

module.exports = new TokenService();
