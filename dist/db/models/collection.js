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
let Collection = class Collection extends sequelize.Model {
};
__decorate([
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
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
    sequelize.ForeignKey(() => user_1.User),
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
], Collection.prototype, "userId", void 0);
__decorate([
    sequelize.ForeignKey(() => theme_1.Theme),
    sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
], Collection.prototype, "themeId", void 0);
__decorate([
    sequelize.HasMany(() => item_1.Item)
], Collection.prototype, "userCollections", void 0);
__decorate([
    sequelize.HasMany(() => field_1.Field)
], Collection.prototype, "fields", void 0);
Collection = __decorate([
    sequelize.Table({
        timestamps: false,
        tableName: 'collections',
    })
], Collection);
exports.Collection = Collection;
