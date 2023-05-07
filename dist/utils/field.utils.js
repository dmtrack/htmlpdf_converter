"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldCheck = void 0;
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const fieldtype_1 = require("../db/models/fieldtype");
const fieldCheck = async () => {
    const stringField = await fieldtype_1.FieldType.findOne({
        where: { name: 'string' },
    });
    if (!stringField) {
        await fieldtype_1.FieldType.create({ name: 'string' });
    }
    const textField = await fieldtype_1.FieldType.findOne({
        where: { name: 'text' },
    });
    if (!textField) {
        await fieldtype_1.FieldType.create({ name: 'text' });
    }
    const numberField = await fieldtype_1.FieldType.findOne({
        where: { name: 'number' },
    });
    if (!numberField) {
        await fieldtype_1.FieldType.create({ name: 'number' });
    }
    const booleanField = await fieldtype_1.FieldType.findOne({
        where: { name: 'boolean' },
    });
    if (!booleanField) {
        await fieldtype_1.FieldType.create({ name: 'boolean' });
    }
    const dateField = await fieldtype_1.FieldType.findOne({
        where: { name: 'date' },
    });
    if (!dateField) {
        await fieldtype_1.FieldType.create({ name: 'date' });
    }
};
exports.fieldCheck = fieldCheck;
