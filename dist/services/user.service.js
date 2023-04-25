"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthError_1 = require("./../errors/AuthError");
const either_1 = require("@sweet-monads/either");
const user_1 = require("../db/models/user");
const user_access_1 = require("../db/models/user_access");
const token_utils_1 = require("../utils/token.utils");
const DBError_1 = require("../errors/DBError");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');
class UserService {
    async registration(user) {
        try {
            const { name, email, password, avatarUrl } = user.body;
            const candidate = await user_1.User.findOne({
                where: { email: email },
            });
            if (candidate) {
                (0, either_1.left)(new AuthError_1.AuthError('User with this email is already registered'));
            }
            const hashpass = await bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const created = new Date().getTime();
            const newUser = await user_1.User.create({
                name: name,
                email: email,
                password: hashpass,
                activationLink: activationLink,
                blocked: false,
                isActivated: false,
                avatarUrl: avatarUrl,
                created: created,
            });
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
            const accessRight = await user_access_1.Access.create({
                access: 'user',
                userId: newUser.id,
            });
            const userWithAccess = await user_1.User.findOne({
                where: { id: newUser.id },
                include: { model: user_access_1.Access },
            });
            const userDto = new UserDto(userWithAccess);
            console.log(userDto);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            const token = await tokenService.saveToken(userDto.id, tokens.refreshToken);
            await user_1.User.update({ tokenId: token.id, accessId: accessRight.id }, { where: { id: userDto.id } });
            userDto.accessId = await accessRight.id;
            userDto.tokenId = await token.id;
            return (0, either_1.right)(Object.assign(Object.assign({}, tokens), { user: userDto }));
        }
        catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return (0, either_1.left)(new AuthError_1.AuthError(`${e.errors[0].path} already exists`));
            }
            else
                return (0, either_1.left)(new DBError_1.DBError('Register user error', e));
        }
    }
    async activate(activationLink) {
        const user = await user_1.User.findOne({ where: { activationLink } });
        if (user) {
            throw new AuthError_1.AuthError('Пользователь с таким email уже существует');
        }
        await user_1.User.update({ isActivated: true }, { where: { activationLink } });
    }
    async login(email, password) {
        const user = await user_1.User.findOne({
            where: { email },
            include: { model: user_access_1.Access },
        });
        if (!user) {
            return (0, either_1.left)(new AuthError_1.AuthError('User with such email is not registered'));
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            return (0, either_1.left)(new AuthError_1.AuthError('wrong password'));
        }
        const userDto = new UserDto(user);
        const tokens = await (0, token_utils_1.tokenCreator)(userDto);
        return (0, either_1.right)(Object.assign(Object.assign({}, tokens), { user: userDto }));
    }
    async reconnect(id) {
        const user = await user_1.User.findOne({
            where: { id },
            include: { model: user_access_1.Access },
        });
        if (!user) {
            return (0, either_1.left)(new AuthError_1.AuthError('User with such email is not registered'));
        }
        const userDto = new UserDto(user);
        const tokens = await (0, token_utils_1.tokenCreator)(userDto);
        return (0, either_1.right)(Object.assign(Object.assign({}, tokens), { user: userDto }));
    }
    async logout(refreshToken) {
        const response = await tokenService.removeToken(refreshToken);
        return response;
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await user_1.User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = await (0, token_utils_1.tokenCreator)(userDto);
        return Object.assign(Object.assign({}, tokens), { user: userDto });
    }
    async getAllUsers() {
        const users = await user_1.User.findAll({ include: user_access_1.Access });
        return users;
    }
    async toggleBlock(id) {
        const user = await user_1.User.findByPk(id);
        if (!user) {
            throw ApiError.badRequest('пользователь с данным id найден');
        }
        await user_1.User.update({ blocked: true }, { where: { id } });
        const updatedUser = await user_1.User.findByPk(id);
        return updatedUser;
    }
    async toggleUnBlock(id) {
        const user = await user_1.User.findByPk(id);
        if (!user) {
            throw ApiError.badRequest('пользователь с данным id найден');
        }
        await user_1.User.update({ blocked: false }, { where: { id } });
        const updatedUser = await user_1.User.findByPk(id);
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await user_1.User.findByPk(id);
        if (!user) {
            throw ApiError.badRequest('пользователь с данным id найден');
        }
        await user_1.User.destroy({ where: { id } });
    }
}
module.exports = new UserService();
