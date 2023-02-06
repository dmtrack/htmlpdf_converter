import { IUserDto } from '../db/models/interface/user.interface';
import { IUser } from './../interfaces/user';
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');

export const tokenCreator = async (userDto: IUserDto) => {
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
};
