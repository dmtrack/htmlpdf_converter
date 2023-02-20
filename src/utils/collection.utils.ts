import { Theme } from '../db/models/theme';

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
};
