import { Collection } from './collections';
import * as sequelize from 'sequelize-typescript';
import { Item } from './items';

@sequelize.Table({
    timestamps: false,
    tableName: 'item_configs',
})
export class Config extends sequelize.Model {
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
    type!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    label!: string;

    @sequelize.BelongsTo(() => Collection)
    collection!: Collection;

    @sequelize.ForeignKey(() => Collection)
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    collectionId!: number;
}
