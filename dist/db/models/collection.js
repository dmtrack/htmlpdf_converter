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
exports.Collection = void 0;
const field_1 = require("./field");
const sequelize = __importStar(require("sequelize-typescript"));
const item_1 = require("./item");
const user_1 = require("./user");
const theme_1 = require("./theme");
const sequelize_typescript_1 = require("sequelize-typescript");
const search_service_1 = require("../../services/search.service");
const ItemConfigs_1 = require("./ItemConfigs");
let Collection = class Collection extends sequelize.Model {
    static afterCreateHook(instance) {
        (0, search_service_1.addCollectionIndex)(instance);
    }
    static afterBulkUpdateHook(options) {
        (0, search_service_1.uploadCollectionIndex)(options.attributes);
    }
    static afterBulkDestroyHook(options) {
        (0, search_service_1.removeCollectionIndex)(options.where.id);
    }
};
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
], Collection.prototype, "id", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
], Collection.prototype, "name", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(4096),
        allowNull: false,
    })
], Collection.prototype, "description", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
], Collection.prototype, "image", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
], Collection.prototype, "themeName", void 0);
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
], Collection.prototype, "created", void 0);
__decorate([
    sequelize.BelongsTo(() => user_1.User)
], Collection.prototype, "user", void 0);
__decorate([
    sequelize.ForeignKey(() => user_1.User),
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
], Collection.prototype, "userId", void 0);
__decorate([
    sequelize.BelongsTo(() => theme_1.Theme)
], Collection.prototype, "theme", void 0);
__decorate([
    sequelize.ForeignKey(() => theme_1.Theme),
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
], Collection.prototype, "themeId", void 0);
__decorate([
    sequelize.HasMany(() => item_1.Item, { onDelete: 'cascade' })
], Collection.prototype, "items", void 0);
__decorate([
    sequelize.HasMany(() => field_1.Field)
], Collection.prototype, "fields", void 0);
__decorate([
    sequelize.HasMany(() => ItemConfigs_1.ItemConfigs, { onDelete: 'cascade' })
], Collection.prototype, "itemConfigs", void 0);
__decorate([
    sequelize_typescript_1.AfterCreate
], Collection, "afterCreateHook", null);
__decorate([
    sequelize.AfterBulkUpdate
], Collection, "afterBulkUpdateHook", null);
__decorate([
    sequelize.AfterBulkDestroy
], Collection, "afterBulkDestroyHook", null);
Collection = __decorate([
    sequelize.Table({
        timestamps: false,
        tableName: 'collections',
    })
], Collection);
exports.Collection = Collection;
