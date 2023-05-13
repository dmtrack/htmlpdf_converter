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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeCheck = exports.deleteAllIndexes = void 0;
const theme_1 = require("../db/models/theme");
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const ItemService = require('../services/item.service');
const moke_json_1 = __importDefault(require("../utils/moke.json"));
const deleteAllIndexes = (target) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fetch(`${process.env.MEILISEARCH_HOST}/indexes/${target}/documents`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer 8e4b2915ac08ef93025cdb0a69c4a3b0c37fd4eb ',
            },
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.deleteAllIndexes = deleteAllIndexes;
const themeCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    const carTheme = yield theme_1.Theme.findOne({
        where: { name: 'rareJDMCars' },
    });
    if (!!!carTheme) {
        console.log('NP CAR');
        yield theme_1.Theme.create({
            name: 'rareJDMCars',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/rareJDMTheme.png?raw=true',
        });
    }
    const vineTheme = yield theme_1.Theme.findOne({ where: { name: 'rareVine' } });
    if (!vineTheme) {
        yield theme_1.Theme.create({
            name: 'rareVine',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/rareVineTheme2.png?raw=true',
        });
    }
    const coinTheme = yield theme_1.Theme.findOne({
        where: {
            name: 'coins',
        },
    });
    if (!coinTheme) {
        yield theme_1.Theme.create({
            name: 'coins',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/coinsTheme.jpg?raw=true',
        });
    }
    const moviesTheme = yield theme_1.Theme.findOne({
        where: {
            name: 'movies',
        },
    });
    if (!moviesTheme) {
        yield theme_1.Theme.create({
            name: 'movies',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/movieTheme.png?raw=true',
        });
    }
    const recordsTheme = yield theme_1.Theme.findOne({
        where: { name: 'vynil' },
    });
    if (!recordsTheme) {
        yield theme_1.Theme.create({
            name: 'vynil',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/vynilTheme.jpg?raw=true',
        });
    }
    const comicsTheme = yield theme_1.Theme.findOne({
        where: { name: 'comics' },
    });
    if (!comicsTheme) {
        yield theme_1.Theme.create({
            name: 'comics',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/comicsTheme.png?raw=true',
        });
    }
    const flowersTheme = yield theme_1.Theme.findOne({
        where: { name: 'flowers' },
    });
    if (!flowersTheme) {
        yield theme_1.Theme.create({
            name: 'flowers',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/flowersTheme.png?raw=true',
        });
    }
    const antiquesTheme = yield theme_1.Theme.findOne({
        where: { name: 'antiques' },
    });
    if (!antiquesTheme) {
        yield theme_1.Theme.create({
            name: 'antiques',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/antiquesTheme.jpg?raw=true',
        });
    }
    const stampsTheme = yield theme_1.Theme.findOne({
        where: { name: 'stamps' },
    });
    if (!stampsTheme) {
        yield theme_1.Theme.create({
            name: 'stamps',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/stampsTheme.png?raw=true',
        });
    }
    const autographsTheme = yield theme_1.Theme.findOne({
        where: { name: 'autographs' },
    });
    if (!autographsTheme) {
        yield theme_1.Theme.create({
            name: 'autographs',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/autographsTheme.png?raw=true',
        });
    }
    const mapsTheme = yield theme_1.Theme.findOne({
        where: {
            name: 'maps',
        },
    });
    if (!mapsTheme) {
        yield theme_1.Theme.create({
            name: 'maps',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/mapsTheme.png?raw=true',
        });
    }
    const eventsTheme = yield theme_1.Theme.findOne({
        where: { name: 'events' },
    });
    if (!eventsTheme) {
        yield theme_1.Theme.create({
            name: 'events',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/eventsTheme.png?raw=true',
        });
    }
    const otherTheme = yield theme_1.Theme.findOne({
        where: { name: 'other' },
    });
    if (!otherTheme) {
        yield theme_1.Theme.create({
            name: 'other',
            defaultImg: 'https://github.com/dmtrack/collections_client/blob/dev-client/public/otherTheme.png?raw=true',
        });
    }
    yield UserService.registration(moke_json_1.default.users.user1);
    yield UserService.registration(moke_json_1.default.users.user2);
    yield CollectionService.create(moke_json_1.default.collections.collection1);
    yield CollectionService.create(moke_json_1.default.collections.collection2);
    yield CollectionService.create(moke_json_1.default.collections.collection3);
    yield CollectionService.create(moke_json_1.default.collections.collection4);
    yield CollectionService.create(moke_json_1.default.collections.collection5);
    yield ItemService.create(moke_json_1.default.items.item1);
    yield ItemService.create(moke_json_1.default.items.item2);
    yield ItemService.create(moke_json_1.default.items.item3);
    yield ItemService.create(moke_json_1.default.items.item4);
    yield ItemService.create(moke_json_1.default.items.item5);
    yield ItemService.create(moke_json_1.default.items.item6);
    yield ItemService.create(moke_json_1.default.items.item7);
    yield ItemService.create(moke_json_1.default.items.item8);
    yield ItemService.setLike(1, 1);
    yield ItemService.setLike(1, 1);
    yield ItemService.setLike(1, 1);
    yield ItemService.setLike(1, 1);
    yield ItemService.setLike(1, 2);
    yield ItemService.setLike(1, 3);
    yield ItemService.setLike(1, 3);
    yield ItemService.setLike(1, 5);
    yield ItemService.setLike(1, 4);
    yield ItemService.setLike(1, 8);
    yield ItemService.setLike(2, 3);
    yield ItemService.setLike(2, 2);
    yield ItemService.setLike(2, 1);
    yield ItemService.setLike(2, 4);
    yield ItemService.setLike(2, 4);
    yield ItemService.setLike(2, 4);
    yield ItemService.setLike(2, 4);
    yield ItemService.setLike(1, 4);
    yield ItemService.setLike(1, 4);
});
exports.themeCheck = themeCheck;
