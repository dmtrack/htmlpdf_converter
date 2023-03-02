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
const user_1 = require("../db/models/user");
const user_access_1 = require("../db/models/user_access");
const token_utils_1 = require("../utils/token.utils");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');
class UserService {
    registration(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, avatarUrl } = user.body;
            const candidate = yield user_1.User.findOne({
                where: { email: email },
            });
            if (candidate) {
                throw ApiError.badRequest('Пользователь с таким email уже существует');
            }
            const hashpass = yield bcrypt.hash(password, 3);
            const activationLink = uuid.v4();
            const created = new Date().getTime();
            const newUser = yield user_1.User.create({
                name: name,
                email: email,
                password: hashpass,
                activationLink: activationLink,
                blocked: false,
                isActivated: false,
                avatarUrl: avatarUrl,
                created: created,
            });
            yield mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
            const accessRight = yield user_access_1.Access.create({
                access: 'user',
                userId: newUser.id,
            });
            const userWithAccess = yield user_1.User.findOne({
                where: { id: newUser.id },
                include: { model: user_access_1.Access },
            });
            const userDto = new UserDto(userWithAccess);
            console.log(userDto);
            const tokens = tokenService.generateTokens(Object.assign({}, userDto));
            const token = yield tokenService.saveToken(userDto.id, tokens.refreshToken);
            yield user_1.User.update({ tokenId: token.id, accessId: accessRight.id }, { where: { id: userDto.id } });
            userDto.accessId = yield accessRight.id;
            userDto.tokenId = yield token.id;
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ where: { activationLink } });
            if (!user) {
                throw ApiError.badRequest('Пользователь с таким email уже существует');
            }
            yield user_1.User.update({ isActivated: true }, { where: { activationLink } });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                where: { email },
                include: { model: user_access_1.Access },
            });
            if (!user) {
                throw ApiError.badRequest('Пользователь с таким email не зарегистрирован');
            }
            const isPassEquals = yield bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError.badRequest('Неверный пароль');
            }
            const userDto = new UserDto(user);
            console.log('dto', userDto);
            const tokens = yield (0, token_utils_1.tokenCreator)(userDto);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    reconnect(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                where: { id },
                include: { model: user_access_1.Access },
            });
            const userDto = new UserDto(user);
            const tokens = yield (0, token_utils_1.tokenCreator)(userDto);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tokenService.removeToken(refreshToken);
            return response;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const userData = yield tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = yield tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }
            const user = yield user_1.User.findByPk(userData.id);
            const userDto = new UserDto(user);
            const tokens = yield (0, token_utils_1.tokenCreator)(userDto);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.User.findAll({ include: user_access_1.Access });
            return users;
        });
    }
    toggleBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                throw ApiError.badRequest('пользователь с данным id найден');
            }
            yield user_1.User.update({ blocked: true }, { where: { id } });
            const updatedUser = yield user_1.User.findByPk(id);
            return updatedUser;
        });
    }
    toggleUnBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                throw ApiError.badRequest('пользователь с данным id найден');
            }
            yield user_1.User.update({ blocked: false }, { where: { id } });
            const updatedUser = yield user_1.User.findByPk(id);
            return updatedUser;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                throw ApiError.badRequest('пользователь с данным id найден');
            }
            yield user_1.User.destroy({ where: { id } });
        });
    }
}
module.exports = new UserService();
