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
    if (!!!carTheme) {
        console.log('NP CAR');
        await theme_1.Theme.create({
            name: 'rareJDMCars',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/rareJDMTheme.png?raw=true',
        });
    }
    const vineTheme = await theme_1.Theme.findOne({ where: { name: 'rareVine' } });
    if (!vineTheme) {
        await theme_1.Theme.create({
            name: 'rareVine',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/rareVineTheme2.png?raw=true',
        });
    }
    const coinTheme = await theme_1.Theme.findOne({
        where: {
            name: 'coins',
        },
    });
    if (!coinTheme) {
        await theme_1.Theme.create({
            name: 'coins',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/coinsTheme.jpg?raw=true',
        });
    }
    const moviesTheme = await theme_1.Theme.findOne({
        where: {
            name: 'movies',
        },
    });
    if (!moviesTheme) {
        await theme_1.Theme.create({
            name: 'movies',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/movieTheme.png?raw=true',
        });
    }
    const recordsTheme = await theme_1.Theme.findOne({
        where: { name: 'vynil' },
    });
    if (!recordsTheme) {
        await theme_1.Theme.create({
            name: 'vynil',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/vynilTheme.jpg?raw=true',
        });
    }
    const comicsTheme = await theme_1.Theme.findOne({
        where: { name: 'comics' },
    });
    if (!comicsTheme) {
        await theme_1.Theme.create({
            name: 'comics',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/comicsTheme.png?raw=true',
        });
    }
    const flowersTheme = await theme_1.Theme.findOne({
        where: { name: 'flowers' },
    });
    if (!flowersTheme) {
        await theme_1.Theme.create({
            name: 'flowers',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/flowersTheme.png?raw=true',
        });
    }
    const antiquesTheme = await theme_1.Theme.findOne({
        where: { name: 'antiques' },
    });
    if (!antiquesTheme) {
        await theme_1.Theme.create({
            name: 'antiques',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/antiquesTheme.jpg?raw=true',
        });
    }
    const stampsTheme = await theme_1.Theme.findOne({
        where: { name: 'stamps' },
    });
    if (!stampsTheme) {
        await theme_1.Theme.create({
            name: 'stamps',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/stampsTheme.png?raw=true',
        });
    }
    const autographsTheme = await theme_1.Theme.findOne({
        where: { name: 'autographs' },
    });
    if (!autographsTheme) {
        await theme_1.Theme.create({
            name: 'autographs',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/autographsTheme.png?raw=true',
        });
    }
    const mapsTheme = await theme_1.Theme.findOne({
        where: {
            name: 'maps',
        },
    });
    if (!mapsTheme) {
        await theme_1.Theme.create({
            name: 'maps',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/mapsTheme.png?raw=true',
        });
    }
    const eventsTheme = await theme_1.Theme.findOne({
        where: { name: 'events' },
    });
    if (!eventsTheme) {
        await theme_1.Theme.create({
            name: 'events',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/eventsTheme.png?raw=true',
        });
    }
    const otherTheme = await theme_1.Theme.findOne({
        where: { name: 'other' },
    });
    if (!otherTheme) {
        await theme_1.Theme.create({
            name: 'other',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/otherTheme.png?raw=true',
        });
    }
    await UserService.registration(moke_json_1.default.users.user1);
    await UserService.registration(moke_json_1.default.users.user2);
    await CollectionService.create(moke_json_1.default.collections.collection1);
    await CollectionService.create(moke_json_1.default.collections.collection2);
    await CollectionService.create(moke_json_1.default.collections.collection3);
    await CollectionService.create(moke_json_1.default.collections.collection4);
    await CollectionService.create(moke_json_1.default.collections.collection5);
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
