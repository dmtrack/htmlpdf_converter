import { IUserDto } from '../db/models/interface/user.interface';
const tokenService = require('../services/token.service');

export const tokenCreator = async (userDto: IUserDto) => {
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
};
