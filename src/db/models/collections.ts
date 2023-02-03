import * as sequelize from 'sequelize-typescript';

import { Item } from './items';
import { User } from './users';

@sequelize.Table({
    timestamps: false,
    tableName: 'collections',
})
export class Collection extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    description!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    theme!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    image!: string;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @sequelize.HasMany(() => Item)
    userCollections!: Item[];
}
