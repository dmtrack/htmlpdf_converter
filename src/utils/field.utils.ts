import { log } from 'console';
import { Theme } from '../db/models/theme';
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
import { FieldType } from '../db/models/fieldtype';

export const fieldCheck = async () => {
    const stringField = await FieldType.findOne({
        where: { name: 'string' },
    });
    if (!stringField) {
        await FieldType.create({ name: 'string' });
    }

    const textField = await FieldType.findOne({
        where: { name: 'text' },
    });
    if (!textField) {
        await FieldType.create({ name: 'text' });
    }

    const numberField = await FieldType.findOne({
        where: { name: 'number' },
    });
    if (!numberField) {
        await FieldType.create({ name: 'number' });
    }

    const booleanField = await FieldType.findOne({
        where: { name: 'boolean' },
    });
    if (!booleanField) {
        await FieldType.create({ name: 'boolean' });
    }

    const dateField = await FieldType.findOne({
        where: { name: 'date' },
    });
    if (!dateField) {
        await FieldType.create({ name: 'date' });
    }
};
