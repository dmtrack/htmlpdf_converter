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
const textfield_1 = require("./field_types/textfield");
const stringfield_1 = require("./field_types/stringfield");
const datefield_1 = require("./field_types/datefield");
const sequelize = __importStar(require("sequelize-typescript"));
const collection_1 = require("./collection");
const comment_1 = require("./comment");
const tag_item_1 = require("./tag_item");
const booleanfield_1 = require("./field_types/booleanfield");
const numfield_1 = require("./field_types/numfield");
const like_1 = require("./like");
let Item = class Item extends sequelize.Model {
};
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        allowNull: false,
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
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
], Item.prototype, "created", void 0);
__decorate([
    sequelize.BelongsTo(() => collection_1.Collection)
], Item.prototype, "collection", void 0);
__decorate([
    sequelize.ForeignKey(() => collection_1.Collection),
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
], Item.prototype, "collectionId", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: true,
    })
], Item.prototype, "image", void 0);
__decorate([
    sequelize.HasMany(() => comment_1.Comment, { onDelete: 'cascade' })
], Item.prototype, "comments", void 0);
__decorate([
    sequelize.HasMany(() => tag_item_1.TagItem)
], Item.prototype, "tags", void 0);
__decorate([
    sequelize.HasMany(() => like_1.Like, { onDelete: 'cascade' })
], Item.prototype, "likes", void 0);
__decorate([
    sequelize.HasMany(() => stringfield_1.StringField, { onDelete: 'cascade' })
], Item.prototype, "stringfields", void 0);
__decorate([
    sequelize.HasMany(() => textfield_1.TextField, { onDelete: 'cascade' })
], Item.prototype, "textfields", void 0);
__decorate([
    sequelize.HasMany(() => booleanfield_1.BooleanField, { onDelete: 'cascade' })
], Item.prototype, "boolean", void 0);
__decorate([
    sequelize.HasMany(() => numfield_1.NumField, { onDelete: 'cascade' })
], Item.prototype, "numfields", void 0);
__decorate([
    sequelize.HasMany(() => datefield_1.DateField, { onDelete: 'cascade' })
], Item.prototype, "datefields", void 0);
Item = __decorate([
    sequelize.Table({
        timestamps: false,
        tableName: 'items',
    })
], Item);
exports.Item = Item;
