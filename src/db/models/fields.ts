import * as sequelize from 'sequelize-typescript';
import { Item } from './items';

@sequelize.Table({
    timestamps: false,
    tableName: 'fields',
})
export class Field extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.BelongsTo(() => Item, 'id')
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    itemId!: Item;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    type!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    value!: string;
}
