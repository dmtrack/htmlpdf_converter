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
const collection_1 = require("./collection");
const comment_1 = require("./comment");
const like_1 = require("./like");
const sequelize_typescript_1 = require("sequelize-typescript");
const search_service_1 = require("../../services/search.service");
const ItemsTags_1 = require("./ItemsTags");
const tag_1 = require("./tag");
let Item = class Item extends sequelize.Model {
    static afterCreateHook(instance) {
        (0, search_service_1.addItemIndex)(instance);
    }
    static afterBulkUpdateHook(options) {
        (0, search_service_1.uploadItemIndex)(options.attributes);
    }
    static afterBulkDestroyHook(options) {
        (0, search_service_1.removeItemIndex)(options.where.id);
    }
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
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
], Item.prototype, "userId", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
    })
], Item.prototype, "str1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
    })
], Item.prototype, "str2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING,
    })
], Item.prototype, "str3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.TEXT,
    })
], Item.prototype, "txt1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.TEXT,
    })
], Item.prototype, "txt2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.TEXT,
    })
], Item.prototype, "txt3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DECIMAL,
    })
], Item.prototype, "numb1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DECIMAL,
    })
], Item.prototype, "numb2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DECIMAL,
    })
], Item.prototype, "numb3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
], Item.prototype, "bool1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
], Item.prototype, "bool2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
], Item.prototype, "bool3", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DATE,
    })
], Item.prototype, "date1", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DATE,
    })
], Item.prototype, "date2", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.DATE,
    })
], Item.prototype, "date3", void 0);
__decorate([
    sequelize.BelongsToMany(() => tag_1.Tag, () => ItemsTags_1.ItemsTags)
], Item.prototype, "tags", void 0);
__decorate([
    sequelize.HasMany(() => ItemsTags_1.ItemsTags, { onDelete: 'cascade' })
], Item.prototype, "itemTags", void 0);
__decorate([
    sequelize.HasMany(() => comment_1.Comment, { onDelete: 'cascade' })
], Item.prototype, "comments", void 0);
__decorate([
    sequelize.HasMany(() => like_1.Like, { onDelete: 'cascade' })
], Item.prototype, "likes", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate
], Item, "afterCreateHook", null);
__decorate([
    sequelize_typescript_1.AfterBulkUpdate
], Item, "afterBulkUpdateHook", null);
__decorate([
    sequelize_typescript_1.AfterBulkDestroy
], Item, "afterBulkDestroyHook", null);
Item = __decorate([
    sequelize.Table({
        timestamps: false,
        tableName: 'items',
    })
], Item);
exports.Item = Item;
