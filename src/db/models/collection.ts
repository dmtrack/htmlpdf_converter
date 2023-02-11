import { Field } from './field';
import * as sequelize from 'sequelize-typescript';

import { Item } from './item';

import { User } from './user';
import { Theme } from './theme';

@sequelize.Table({
    timestamps: false,
    tableName: 'collections',
})
export class Collection extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING(4096),
        allowNull: false,
    })
    description!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    image!: string;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;

    @sequelize.ForeignKey(() => Theme)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    themeId!: number;

    @sequelize.HasMany(() => Item)
    userCollections!: Item[];

    @sequelize.HasMany(() => Field)
    fields!: Field[];
}
