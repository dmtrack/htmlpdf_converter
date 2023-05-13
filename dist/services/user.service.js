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
const AuthError_1 = require("./../errors/AuthError");
const either_1 = require("@sweet-monads/either");
const user_1 = require("../db/models/user");
const user_access_1 = require("../db/models/user_access");
const token_utils_1 = require("../utils/token.utils");
const DBError_1 = require("../errors/DBError");
const EntityError_1 = require("../errors/EntityError");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mail.service');
const tokenService = require('../services/token.service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');
class UserService {
    registration(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, email, password, avatarUrl } = user.body;
                const candidate = yield user_1.User.findOne({
                    where: { email: email },
                });
                if (!avatarUrl) {
                    avatarUrl =
                        'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultAvatarFinal.png?raw=true';
                }
                if (candidate) {
                    (0, either_1.left)(new AuthError_1.AuthError('User with this email is already registered'));
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
                    access: newUser.name === 'dmtrack' ? 'admin' : 'user',
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
                return (0, either_1.right)(Object.assign(Object.assign({}, tokens), { user: userDto }));
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return (0, either_1.left)(new AuthError_1.AuthError(`${e.errors[0].path} already exists`));
                }
                else
                    return (0, either_1.left)(new DBError_1.DBError('Register user error', e));
            }
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ where: { activationLink } });
            if (user) {
                throw new AuthError_1.AuthError('Пользователь с таким email уже существует');
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
            if (user === null || user === void 0 ? void 0 : user.blocked) {
                console.log('hello block');
                return (0, either_1.left)(new AuthError_1.AuthError('Sorry, but are blocked. Ask administrator why'));
            }
            if (!user) {
                return (0, either_1.left)(new AuthError_1.AuthError('User with such email is not registered'));
            }
            const isPassEquals = yield bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                return (0, either_1.left)(new AuthError_1.AuthError('wrong password'));
            }
            const userDto = new UserDto(user);
            const tokens = yield (0, token_utils_1.tokenCreator)(userDto);
            return (0, either_1.right)(Object.assign(Object.assign({}, tokens), { user: userDto }));
        });
    }
    reconnect(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                where: { id },
                include: { model: user_access_1.Access },
            });
            if (!user) {
                return (0, either_1.left)(new AuthError_1.AuthError('User with such email is not registered'));
            }
            const userDto = new UserDto(user);
            const tokens = yield (0, token_utils_1.tokenCreator)(userDto);
            return (0, either_1.right)(Object.assign(Object.assign({}, tokens), { user: userDto }));
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield tokenService.removeToken(refreshToken);
            return (0, either_1.right)(response);
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
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                where: { id: id },
            });
            console.log(user);
            const userDto = new UserDto(user);
            if (!user) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no user with id:${id} in data-base`));
            }
            return (0, either_1.right)(userDto);
        });
    }
    toggleBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no user with id:${id} in data-base`));
            }
            yield user_1.User.update({ blocked: true }, { where: { id } });
            const updatedUser = yield user_1.User.findByPk(id);
            return (0, either_1.right)(updatedUser);
        });
    }
    toggleUnBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no user with id:${id} in data-base`));
            }
            yield user_1.User.update({ blocked: false }, { where: { id } });
            const updatedUser = yield user_1.User.findByPk(id);
            return (0, either_1.right)(updatedUser);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                return (0, either_1.left)(new EntityError_1.EntityError(`there is no user with id:${id} in data-base`));
            }
            yield user_1.User.destroy({ where: { id } });
        });
    }
}
module.exports = new UserService();
