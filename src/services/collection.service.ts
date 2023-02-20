import { RequestHandler } from 'express';
import { Collection } from '../db/models/collection';
import {
    ICollection,
    ICollectionCreate,
} from '../interfaces/models/collection';

const ApiError = require('../exceptions/api-error');

class CollectionService {
    async create(collection: ICollectionCreate) {
        try {
            const { name, description, userId, image, themeId } = collection;
            const created = new Date().getTime();
            const newCollection = await Collection.create({
                name: name,
                description: description,
                image: image,
                themeId: themeId,
                userId: userId,
                created: created,
            });

            return newCollection;
        } catch (e: any) {
            return e.message;
        }
    }

    async getAllCollections() {
        try {
            const collections = await Collection.findAll();
            return collections;
        } catch (e: any) {
            return e.message;
        }
    }

    async getOneCollection(id: number) {
        const collection: ICollection | null = await Collection.findOne({
            where: { id: id },
        });
        if (collection) {
            return collection;
        } else return `collection with id:${id} is not found`;
    }

    async getUserCollections(userId: number) {
        const collections: ICollection[] | null = await Collection.findAll({
            where: { userId: userId },
        });
        if (collections) {
            return collections;
        } else return `collections for user with id:${userId} are not found`;
    }

    async deleteOneCollection(id: number) {
        await Collection.destroy({
            where: { id: id },
        });
    }

    // async activate(activationLink: string) {
    //     const user = await User.findOne({ where: { activationLink } });
    //     if (!user) {
    //         throw ApiError.badRequest(
    //             'Пользователь с таким email уже существует'
    //         );
    //     }
    //     await User.update({ isActivated: true }, { where: { activationLink } });
    // }

    // async login(email: string, password: string) {
    //     const user = await User.findOne({
    //         where: { email },
    //         include: { model: Access },
    //     });

    //     if (!user) {
    //         throw ApiError.badRequest(
    //             'Пользователь с таким email не зарегистрирован'
    //         );
    //     }
    //     const isPassEquals = await bcrypt.compare(password, user.password);
    //     if (!isPassEquals) {
    //         throw ApiError.badRequest('Неверный пароль');
    //     }

    //     const userDto: IUserDto = new UserDto(user);
    //     console.log('dto', userDto);

    //     const tokens = await tokenCreator(userDto);
    //     return { ...tokens, user: userDto };
    // }

    // async reconnect(id: number) {
    //     const user = await User.findOne({
    //         where: { id },
    //         include: { model: Access },
    //     });
    //     const userDto = new UserDto(user);
    //     const tokens = await tokenCreator(userDto);
    //     return { ...tokens, user: userDto };
    // }

    // async logout(refreshToken: string) {
    //     const response = await tokenService.removeToken(refreshToken);
    //     return response;
    // }

    // async refresh(refreshToken: string) {
    //     if (!refreshToken) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const userData = await tokenService.validateRefreshToken(refreshToken);
    //     const tokenFromDb = await tokenService.findToken(refreshToken);
    //     if (!userData || !tokenFromDb) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const user = await User.findByPk(userData.id);
    //     const userDto = new UserDto(user);
    //     const tokens = await tokenCreator(userDto);
    //     return { ...tokens, user: userDto };
    // }

    // async getAllUsers() {
    //     const users = await User.findAll({ include: Access });
    //     return users;
    // }

    // async toggleBlock(id: number) {
    //     const user = await User.findByPk(id);
    //     if (!user) {
    //         throw ApiError.badRequest('пользователь с данным id найден');
    //     }
    //     await User.update({ blocked: true }, { where: { id } });
    //     const updatedUser: User | null = await User.findByPk(id);
    //     return updatedUser;
    // }
    // async toggleUnBlock(id: number) {
    //     const user = await User.findByPk(id);
    //     if (!user) {
    //         throw ApiError.badRequest('пользователь с данным id найден');
    //     }
    //     await User.update({ blocked: false }, { where: { id } });
    //     const updatedUser: User | null = await User.findByPk(id);
    //     return updatedUser;
    // }

    // async deleteUser(id: number) {
    //     const user = await User.findByPk(id);
    //     if (!user) {
    //         throw ApiError.badRequest('пользователь с данным id найден');
    //     }
    //     await User.destroy({ where: { id } });
    // }
}
module.exports = new CollectionService();
