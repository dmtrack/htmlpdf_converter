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
exports.themeCheck = void 0;
const theme_1 = require("../db/models/theme");
const themeCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    const carTheme = yield theme_1.Theme.findOne({
        where: { name: 'rareJDMCars' },
    });
    if (!carTheme) {
        yield theme_1.Theme.create({ name: 'rareJDMCars' });
    }
    const vineTheme = yield theme_1.Theme.findOne({ where: { name: 'rareVine' } });
    if (!vineTheme) {
        yield theme_1.Theme.create({ name: 'rareVine' });
    }
});
exports.themeCheck = themeCheck;
