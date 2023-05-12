import * as sequelize from 'sequelize-typescript';

import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Item } from './item';
import { Tag } from './tag';

@Table({ timestamps: false, tableName: 'items_tags' })
export class ItemsTags extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.ForeignKey(() => Item)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    itemId!: number;

    @sequelize.ForeignKey(() => Tag)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    tagId!: number;
}
