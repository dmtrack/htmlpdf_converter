import * as sequelize from 'sequelize-typescript';
import { Field } from '../field';
import { Item } from '../item';

@sequelize.Table({
    timestamps: false,
    tableName: 'datefields',
})
export class DateField extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
    value!: string;

    @sequelize.BelongsTo(() => Item)
    item!: Item;

    @sequelize.ForeignKey(() => Item)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    itemId!: number;

    @sequelize.BelongsTo(() => Field)
    field!: Field;

    @sequelize.ForeignKey(() => Field)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    fieldId!: number;
}
