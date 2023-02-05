import { IUserSignUp } from '../db/models/interface/user.interface';
import { RequestHandler } from 'express';

import { User } from '../db/models/users';
import { IUserDto } from '../db/models/interface/user.interface';
import { IToken } from '../db/models/interface/token.interface';
import { Access } from '../db/models/user_access';

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async signUpUser(user: IUserSignUp) {
        const { name, email, password } = user.body;
        const candidate: User | null = await User.findOne({
            where: { email: email },
        });
        if (candidate) {
            throw new Error('Пользователь с таким email уже существует');
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
            avatarUrl: 'www.image.com/1',
        });
        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/user/activate/${activationLink}`
        );

        const userDto = new UserDto(newUser);
        const tokens = tokenService.generateTokens({ ...userDto });
        const accessRight = await Access.create({
            access: 'user',
            userId: userDto.id,
        });
        const token: IToken = await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken
        );
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
            throw new Error('неккоректная ссылка активации');
        }
        await User.update({ isActivated: true }, { where: { activationLink } });
    }
}

module.exports = new UserService();
