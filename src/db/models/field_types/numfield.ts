import * as sequelize from 'sequelize-typescript';
import { Field } from '../field';
import { Item } from '../item';

@sequelize.Table({
    timestamps: false,
    tableName: 'numfields',
})
export class NumField extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.DECIMAL,
        allowNull: true,
    })
    value!: number;

    @sequelize.ForeignKey(() => Item)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    itemId!: number;

    @sequelize.ForeignKey(() => Field)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    fieldId!: number;
}
