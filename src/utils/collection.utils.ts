import { log } from 'console';
import { Theme } from '../db/models/theme';
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const ItemService = require('../services/item.service');

import mokeData from '../utils/moke.json';
import { Item } from '../db/models/item';

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

    const coinTheme = await Theme.findOne({ where: { name: 'rareCoins' } });
    if (!coinTheme) {
        await Theme.create({ name: 'rareCoins' });
    }

    const moviesTheme = await Theme.findOne({
        where: { name: 'Movies' },
    });
    if (!moviesTheme) {
        await Theme.create({ name: 'Movies' });
    }

    const recordsTheme = await Theme.findOne({
        where: { name: 'Records' },
    });
    if (!recordsTheme) {
        await Theme.create({ name: 'Records' });
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
