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
exports.fieldCheck = void 0;
const CollectionService = require('../services/collection.service');
const UserService = require('../services/user.service');
const fieldtype_1 = require("../db/models/fieldtype");
const fieldCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    const stringField = yield fieldtype_1.FieldType.findOne({
        where: { name: 'string' },
    });
    if (!stringField) {
        yield fieldtype_1.FieldType.create({ name: 'string' });
    }
    const textField = yield fieldtype_1.FieldType.findOne({
        where: { name: 'text' },
    });
    if (!textField) {
        yield fieldtype_1.FieldType.create({ name: 'text' });
    }
    const numberField = yield fieldtype_1.FieldType.findOne({
        where: { name: 'number' },
    });
    if (!numberField) {
        yield fieldtype_1.FieldType.create({ name: 'number' });
    }
    const booleanField = yield fieldtype_1.FieldType.findOne({
        where: { name: 'boolean' },
    });
    if (!booleanField) {
        yield fieldtype_1.FieldType.create({ name: 'boolean' });
    }
    const dateField = yield fieldtype_1.FieldType.findOne({
        where: { name: 'date' },
    });
    if (!dateField) {
        yield fieldtype_1.FieldType.create({ name: 'date' });
    }
});
exports.fieldCheck = fieldCheck;
