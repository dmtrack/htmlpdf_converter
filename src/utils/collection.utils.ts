import { Theme } from '../db/models/theme';
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const ItemService = require('../services/item.service');

import mokeData from '../utils/moke.json';

export const themeCheck = async () => {
    const carTheme = await Theme.findOne({
        where: { name: 'rareJDMCars' },
    });
    if (!carTheme) {
        await Theme.create({ name: 'rareJDMCars' });
    }

    const vineTheme = await Theme.findOne({ where: { name: 'rareVine' } });

    if (!vineTheme) {
        await Theme.create({ name: 'rareVine' });
    }

    const coinTheme = await Theme.findOne({ where: { name: 'coins' } });
    if (!coinTheme) {
        await Theme.create({ name: 'coins' });
    }

    const moviesTheme = await Theme.findOne({
        where: { name: 'movies' },
    });
    if (!moviesTheme) {
        await Theme.create({ name: 'movies' });
    }

    const recordsTheme = await Theme.findOne({
        where: { name: 'vynil' },
    });
    if (!recordsTheme) {
        await Theme.create({ name: 'vynil' });
    }
    const otherTheme = await Theme.findOne({
        where: { name: 'other' },
    });
    if (!otherTheme) {
        await Theme.create({ name: 'other' });
    }

    const comicsTheme = await Theme.findOne({
        where: { name: 'comics' },
    });
    if (!comicsTheme) {
        await Theme.create({ name: 'comics' });
    }

    const flowersTheme = await Theme.findOne({
        where: { name: 'flowers' },
    });
    if (!flowersTheme) {
        await Theme.create({ name: 'flowers' });
    }
    const antiquesTheme = await Theme.findOne({
        where: { name: 'antiques' },
    });
    if (!antiquesTheme) {
        await Theme.create({ name: 'antiques' });
    }

    const stampsTheme = await Theme.findOne({
        where: { name: 'stamps' },
    });
    if (!stampsTheme) {
        await Theme.create({ name: 'stamps' });
    }

    const autographsTheme = await Theme.findOne({
        where: { name: 'autographs' },
    });
    if (!autographsTheme) {
        await Theme.create({ name: 'autographs' });
    }

    const mapsTheme = await Theme.findOne({
        where: { name: 'maps' },
    });
    if (!mapsTheme) {
        await Theme.create({ name: 'maps' });
    }

    const eventsTheme = await Theme.findOne({
        where: { name: 'events' },
    });
    if (!eventsTheme) {
        await Theme.create({ name: 'events' });
    }

    await UserService.registration(mokeData.users.user1);
    await UserService.registration(mokeData.users.user2);
    await CollectionService.create(mokeData.collections.collection1);
    await CollectionService.create(mokeData.collections.collection2);
    await CollectionService.create(mokeData.collections.collection3);
    await CollectionService.create(mokeData.collections.collection4);
    await CollectionService.create(mokeData.collections.collection5);
    await ItemService.create(mokeData.items.item1);
    await ItemService.create(mokeData.items.item2);
    await ItemService.create(mokeData.items.item3);
    await ItemService.create(mokeData.items.item4);
    await ItemService.create(mokeData.items.item5);
    await ItemService.create(mokeData.items.item6);
    await ItemService.create(mokeData.items.item7);
    await ItemService.create(mokeData.items.item8);

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
