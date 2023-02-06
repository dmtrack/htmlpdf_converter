import { IUserRegistration } from '../db/models/interface/user.interface';
import { RequestHandler } from 'express';

import { User } from '../db/models/users';
import { IUserDto } from '../db/models/interface/user.interface';
import { IToken } from '../db/models/interface/token.interface';
import { Access } from '../db/models/user_access';
import { tokenCreator } from '../utils/token.utils';

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(user: IUserRegistration) {
        const { name, email, password, avatarUrl } = user.body;
        const candidate: User | null = await User.findOne({
            where: { email: email },
        });
        if (candidate) {
            throw ApiError.badRequest(
                'Пользователь с таким email уже существует'
            );
        }
        const hashpass = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const newUser: IUserDto = await User.create({
            name: name,
            email: email,
            password: hashpass,
            activationLink: activationLink,
            blocked: false,
            isActivated: false,
            avatarUrl: avatarUrl,
        });
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/user/activate/${activationLink}`
        );

        const userDto = new UserDto(newUser);

        const tokens = tokenService.generateTokens({ ...userDto });
        const token: IToken = await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken
        );
        const accessRight = await Access.create({
            access: 'user',
            userId: newUser.id,
        });
        await User.update(
            { tokenId: token.id, accessId: accessRight.id },
            { where: { id: userDto.id } }
        );
        userDto.accessId = await accessRight.id;
        userDto.tokenId = await token.id;

        return {
            ...tokens,
            user: userDto,
        };
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ where: { activationLink } });
        if (!user) {
            throw ApiError.badRequest(
                'Пользователь с таким email уже существует'
            );
        }
        await User.update({ isActivated: true }, { where: { activationLink } });
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw ApiError.badRequest(
                'Пользователь с таким email не зарегистрирован'
            );
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);

        const tokens = await tokenCreator(userDto);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken: string) {
        const response = await tokenService.removeToken(refreshToken);
        return response;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = await tokenCreator(userDto);
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
