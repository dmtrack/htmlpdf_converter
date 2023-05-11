import { AuthError } from './../errors/AuthError';
import { left, right } from '@sweet-monads/either';
import { IUserRegistration } from '../db/models/interface/user.interface';
import { User } from '../db/models/user';
import { IUserDto } from '../db/models/interface/user.interface';
import { IToken } from '../db/models/interface/token.interface';
import { Access } from '../db/models/user_access';
import { tokenCreator } from '../utils/token.utils';
import { DBError } from '../errors/DBError';
import { EntityError } from '../errors/EntityError';

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');

class UserService {
    async registration(user: IUserRegistration) {
        try {
            let { name, email, password, avatarUrl } = user.body;
            const candidate: User | null = await User.findOne({
                where: { email: email },
            });
            if (!avatarUrl) {
                avatarUrl =
                    'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultAvatarFinal.png?raw=true';
            }

            if (candidate) {
                left(
                    new AuthError('User with this email is already registered')
                );
            }

            const hashpass = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const created = new Date().getTime();
            const newUser: IUserDto = await User.create({
                name: name,
                email: email,
                password: hashpass,
                activationLink: activationLink,
                blocked: false,
                isActivated: false,
                avatarUrl: avatarUrl,
                created: created,
            });
            await mailService.sendActivationMail(
                email,
                `${process.env.API_URL}/api/user/activate/${activationLink}`
            );

            const accessRight = await Access.create({
                access: newUser.name === 'dmtrack' ? 'admin' : 'user',
                userId: newUser.id,
            });

            const userWithAccess = await User.findOne({
                where: { id: newUser.id },
                include: { model: Access },
            });

            const userDto = new UserDto(userWithAccess);
            console.log(userDto);

            const tokens = tokenService.generateTokens({ ...userDto });
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

            return right({
                ...tokens,
                user: userDto,
            });
        } catch (e: any) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return left(
                    new AuthError(`${e.errors[0].path} already exists`)
                );
            } else return left(new DBError('Register user error', e));
        }
    }

    async activate(activationLink: string) {
        const user = await User.findOne({ where: { activationLink } });
        if (user) {
            throw new AuthError('Пользователь с таким email уже существует');
        }
        await User.update({ isActivated: true }, { where: { activationLink } });
    }

    async login(email: string, password: string) {
        const user = await User.findOne({
            where: { email },
            include: { model: Access },
        });
        if (user?.blocked) {
            console.log('hello block');

            return left(
                new AuthError('Sorry, but are blocked. Ask administrator why')
            );
        }

        if (!user) {
            return left(
                new AuthError('User with such email is not registered')
            );
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return left(new AuthError('wrong password'));
        }

        const userDto: IUserDto = new UserDto(user);
        const tokens = await tokenCreator(userDto);
        return right({ ...tokens, user: userDto });
    }

    async reconnect(id: number) {
        const user = await User.findOne({
            where: { id },
            include: { model: Access },
        });

        if (!user) {
            return left(
                new AuthError('User with such email is not registered')
            );
        }
        const userDto = new UserDto(user);
        const tokens = await tokenCreator(userDto);
        return right({ ...tokens, user: userDto });
    }

    async logout(refreshToken: string) {
        const response = await tokenService.removeToken(refreshToken);
        return right(response);
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

    async getAllUsers() {
        const users = await User.findAll({ include: Access });
        return users;
    }

    async getOneUser(id: number) {
        const user = await User.findOne({
            where: { id: id },
        });

        console.log(user);
        const userDto = new UserDto(user);

        if (!user) {
            return left(
                new EntityError(`there is no user with id:${id} in data-base`)
            );
        }
        return right(userDto);
    }

    async toggleBlock(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            return left(
                new EntityError(`there is no user with id:${id} in data-base`)
            );
        }
        await User.update({ blocked: true }, { where: { id } });
        const updatedUser: User | null = await User.findByPk(id);
        return right(updatedUser);
    }
    async toggleUnBlock(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            return left(
                new EntityError(`there is no user with id:${id} in data-base`)
            );
        }
        await User.update({ blocked: false }, { where: { id } });
        const updatedUser: User | null = await User.findByPk(id);
        return right(updatedUser);
    }

    async deleteUser(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            return left(
                new EntityError(`there is no user with id:${id} in data-base`)
            );
        }
        await User.destroy({ where: { id } });
    }
}

module.exports = new UserService();
