import * as sequelize from 'sequelize-typescript';
import { Field } from '../field';
import { Item } from '../item';

@sequelize.Table({
    timestamps: false,
    tableName: 'booleanfields',
})
export class BooleanField extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    value!: boolean;

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
