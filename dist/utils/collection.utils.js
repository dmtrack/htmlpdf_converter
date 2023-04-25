"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeCheck = void 0;
const theme_1 = require("../db/models/theme");
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const ItemService = require('../services/item.service');
const moke_json_1 = __importDefault(require("../utils/moke.json"));
const themeCheck = async () => {
    const carTheme = await theme_1.Theme.findOne({
        where: { name: 'rareJDMCars' },
    });
    if (!carTheme) {
        await theme_1.Theme.create({ name: 'rareJDMCars' });
    }
    const vineTheme = await theme_1.Theme.findOne({ where: { name: 'rareVine' } });
    if (!vineTheme) {
        await theme_1.Theme.create({ name: 'rareVine' });
    }
    await UserService.registration(moke_json_1.default.users.user1);
    await UserService.registration(moke_json_1.default.users.user2);
    await CollectionService.create(moke_json_1.default.collections.collection1);
    await CollectionService.create(moke_json_1.default.collections.collection2);
    await ItemService.create(moke_json_1.default.items.item1);
    await ItemService.create(moke_json_1.default.items.item2);
    await ItemService.create(moke_json_1.default.items.item3);
    await ItemService.create(moke_json_1.default.items.item4);
    await ItemService.create(moke_json_1.default.items.item5);
    await ItemService.create(moke_json_1.default.items.item6);
    await ItemService.create(moke_json_1.default.items.item7);
    await ItemService.create(moke_json_1.default.items.item8);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 1);
    await ItemService.setLike(1, 2);
    await ItemService.setLike(1, 3);
    await ItemService.setLike(1, 3);
    await ItemService.setLike(1, 5);
    await ItemService.setLike(1, 4);
    await ItemService.setLike(1, 8);
    await ItemService.setLike(2, 3);
    await ItemService.setLike(2, 2);
    await ItemService.setLike(2, 1);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(2, 4);
    await ItemService.setLike(1, 4);
    await ItemService.setLike(1, 4);
};
exports.themeCheck = themeCheck;
