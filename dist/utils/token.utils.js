"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenCreator = void 0;
const tokenService = require('../services/token.service');
const tokenCreator = async (userDto) => {
    const tokens = tokenService.generateTokens(Object.assign({}, userDto));
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens;
};
exports.tokenCreator = tokenCreator;
