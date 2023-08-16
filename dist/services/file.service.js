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
const uuid = require('uuid');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../errors/api-error');
class FileService {
    upload(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // let { name, email, password, avatarUrl } = user.body;
                // const candidate: User | null = await User.findOne({
                //     where: { email: email },
                // });
                // if (!avatarUrl) {
                //     avatarUrl =
                //         'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultAvatarFinal.png?raw=true';
                // }
                // if (candidate) {
                //     left(
                //         new AuthError('User with this email is already registered')
                //     );
                // }
                // const hashpass = await bcrypt.hash(password, 3);
                // const activationLink = uuid.v4();
                // const created = new Date().getTime();
                // const newUser: IUserDto = await User.create({
                //     name: name,
                //     email: email,
                //     password: hashpass,
                //     activationLink: activationLink,
                //     blocked: false,
                //     isActivated: false,
                //     avatarUrl: avatarUrl,
                //     created: created,
                // });
                // await mailService.sendActivationMail(
                //     email,
                //     `${process.env.API_URL}/api/user/activate/${activationLink}`
                // );
                // const accessRight = await Access.create({
                //     access: 'admin',
                //     userId: newUser.id,
                // });
                // const userWithAccess = await User.findOne({
                //     where: { id: newUser.id },
                //     include: { model: Access },
                // });
                // const userDto = new UserDto(userWithAccess);
                // console.log(userDto);
                // const tokens = tokenService.generateTokens({ ...userDto });
                // const token: IToken = await tokenService.saveToken(
                //     userDto.id,
                //     tokens.refreshToken
                // );
                // await User.update(
                //     { tokenId: token.id, accessId: accessRight.id },
                //     { where: { id: userDto.id } }
                // );
                // userDto.accessId = await accessRight.id;
                // userDto.tokenId = await token.id;
                // return right({
                //     ...tokens,
                //     user: userDto,
                // });
            }
            catch (e) {
                // if (e.name === 'SequelizeUniqueConstraintError') {
                //     return left(
                //         new AuthError(`${e.errors[0].path} already exists`)
                //     );
                // } else return left(new DBError('Register user error', e));
            }
        });
    }
    getAllLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            // const logs = await User.findAll({ include: Access });
            // return logs;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //     const user = await User.findByPk(id);
            //     if (!user) {
            //         return left(
            //             new EntityError(`there is no user with id:${id} in data-base`)
            //         );
            //     }
            //     await User.destroy({ where: { id } });
            // }
        });
    }
}
module.exports = new FileService();
