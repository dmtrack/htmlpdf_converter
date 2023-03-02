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
exports.updateCollection = exports.deleteOneCollection = exports.getOneCollection = exports.getUserCollections = exports.getTopAmountOfItemsCollection = exports.getCollections = exports.createCollection = void 0;
const CollectionService = require('../services/collection.service');
const createCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let collection = yield CollectionService.create(req.body);
        return res.status(200).json({
            message: 'collection was created succesfully',
            data: collection,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.createCollection = createCollection;
const getCollections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield CollectionService.getAllCollections();
        return res.status(200).json({
            message: `collections fetched successfully`,
            data: collections,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.getCollections = getCollections;
const getTopAmountOfItemsCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield CollectionService.getTopAmountOfItemsCollection();
        return res.status(200).json({
            message: `Collections are fetched successfully`,
            data: collections,
        });
    }
    catch (err) {
        return res.status(400).json({ type: `Database error`, message: err });
    }
});
exports.getTopAmountOfItemsCollection = getTopAmountOfItemsCollection;
const getUserCollections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const collections = yield CollectionService.getUserCollections(id);
        return res.status(200).json({
            message: `collections fetched successfully`,
            data: collections,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.getUserCollections = getUserCollections;
const getOneCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const collection = yield CollectionService.getOneCollection(id);
        if (collection) {
            return res.status(200).json({
                message: `collection with id:${id} is found`,
                user: collection,
            });
        }
        else
            return res.status(200).json({
                message: `collection with id:${id} is not found`,
            });
    }
    catch (err) {
        return res.status(404).json({
            error: 404,
            message: `${err.message}`,
        });
    }
});
exports.getOneCollection = getOneCollection;
const deleteOneCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('delete collection!');
    try {
        console.log('delete collection!');
        const id = req.params.id;
        yield CollectionService.deleteOneCollection(id);
        return res.status(200).json({
            message: `collection with id:${id} was deleted`,
            id: req.body,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.deleteOneCollection = deleteOneCollection;
const updateCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCollection = yield CollectionService.updateCollection(req.body);
        return res.status(200).json({
            message: `collection with id: ${req.body.id} was updated`,
            data: updatedCollection,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.updateCollection = updateCollection;
// export const signUp: RequestHandler = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const user: User | null = await User.findOne({
//             where: { email: email },
//         });
//         const hash = new SHA3(256);
//         const hashpass = hash.update(password).digest('hex');
//         const obj = { ...req.body, blocked: false };
//         obj.password = hashpass;
//         if (Number(user) === 0) {
//             let user = await User.create({
//                 ...obj,
//             });
//             return res.status(200).json({
//                 message: `user with id:${user.id} was succesfully signed up`,
//                 data: user,
//             });
//         } else throw Error();
//     } catch (err: any) {
//         return res.status(409).json({
//             error: 409,
//             message: `user with email:${req.body.email} is already exist`,
//         });
//     }
// };
// export const signIn: RequestHandler = async (req, res, next) => {
//     try {
//         const { password, email, login } = req.body;
//         const hash = new SHA3(256);
//         const hashpass = hash.update(password).digest('hex');
//         const user: User | null = await User.findOne({
//             where: { password: hashpass, email: email },
//         });
//         console.log('found user:', user);
//         if (user) {
//             if (user.blocked === false) {
//                 await User.update({ login: login }, { where: { email } });
//                 return res.status(200).json({
//                     message: `user with id:${user.id} was succesfully signed up`,
//                     data: user,
//                 });
//             } else throw Error;
//         } else throw Error;
//     } catch (err: any) {
//         return res.status(401).json({
//             error: 401,
//             message: `access is not allowed`,
//         });
//     }
// };
// export const toggleBlock: RequestHandler = async (req, res, next) => {
//     try {
//         const { params } = req.body;
//         params.forEach(async (id: string) => {
//             const user = await User.findByPk(id);
//             if (user) {
//                 await User.update({ blocked: true }, { where: { id } });
//                 const updatedUser: User | null = await User.findByPk(id);
//             }
//         });
//         return res.status(200).json({
//             message: `user's status with id are changed`,
//             id: req.body,
//         });
//     } catch (err: any) {
//         return res.status(404).json({
//             error: 404,
//             message: `${err.message}`,
//         });
//     }
// };
// export const toggleUnblock: RequestHandler = async (req, res, next) => {
//     try {
//         const { params } = req.body;
//         params.forEach(async (id: string) => {
//             const user = await User.findByPk(id);
//             if (user) {
//                 await User.update({ blocked: false }, { where: { id } });
//                 const updatedUser: User | null = await User.findByPk(id);
//             }
//         });
//         return res.status(200).json({
//             message: `user's status with id are changed`,
//             id: req.body,
//         });
//     } catch (err: any) {
//         return res.status(404).json({
//             error: 404,
//             message: `${err.message}`,
//         });
//     }
// };
// export const deleteUser: RequestHandler = async (req, res, next) => {
//     try {
//         const { params } = req.body;
//         console.log(params, 'test');
//         params.forEach(async (id: string) => {
//             await User.destroy({ where: { id } });
//         });
//         return res.status(200).json({
//             message: `users status with ids are deleted`,
//             id: req.body,
//         });
//     } catch (err: any) {
//         return err.message;
//     }
// };
// export const getAllUsers: RequestHandler = async (req, res, next) => {
//     try {
//         const allUsers: User[] = await User.findAll();
//         return res
//             .status(200)
//             .json({ message: `users fetched successfully`, data: allUsers });
//     } catch (err: any) {
//         return err.message;
//     }
// };
// export const getUser: RequestHandler = async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const user: User | null = await User.findOne({
//             where: { id: id },
//         });
//         if (user) {
//             return res.status(200).json({
//                 message: `user with id:${id} is found`,
//                 user: user,
//             });
//         } else
//             return res.status(200).json({
//                 message: `user with id:${id} is not found`,
//             });
//     } catch (err: any) {
//         return res.status(404).json({
//             error: 404,
//             message: `${err.message}`,
//         });
//     }
// };
// export const getUserStatus: RequestHandler = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const user: User | null = await User.findByPk(id);
//         return res
//             .status(200)
//             .json({ message: `user with id: ${id} was fetched`, data: user });
//     } catch (err: any) {
//         return err.message;
//     }
// };
