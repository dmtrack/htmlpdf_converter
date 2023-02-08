"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const sequelize = __importStar(require("sequelize-typescript"));
const collections_1 = require("./collections");
const comments_1 = require("./comments");
const tags_1 = require("./tags");
let Item = class Item extends sequelize.Model {
};
__decorate([
    sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
], Item.prototype, "id", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
], Item.prototype, "name", void 0);
__decorate([
    sequelize.BelongsTo(() => collections_1.Collection)
], Item.prototype, "collection", void 0);
__decorate([
    sequelize.ForeignKey(() => collections_1.Collection),
    sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
], Item.prototype, "collectionId", void 0);
__decorate([
    sequelize.HasMany(() => comments_1.Comment)
], Item.prototype, "comments", void 0);
__decorate([
    sequelize.HasMany(() => tags_1.Tag)
], Item.prototype, "tags", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
], Item.prototype, "str1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
], Item.prototype, "str2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
], Item.prototype, "str3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
], Item.prototype, "txt1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
], Item.prototype, "txt2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
], Item.prototype, "txt3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: true,
    })
], Item.prototype, "num1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: true,
    })
], Item.prototype, "num2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: true,
    })
], Item.prototype, "num3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: true,
    })
], Item.prototype, "bool1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: true,
    })
], Item.prototype, "bool2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: true,
    })
], Item.prototype, "bool3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
], Item.prototype, "date1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
], Item.prototype, "date2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
], Item.prototype, "date3", void 0);
Item = __decorate([
    sequelize.Table({
        timestamps: false,
        tableName: 'items',
    })
], Item);
exports.Item = Item;
