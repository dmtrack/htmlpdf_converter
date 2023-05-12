import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Collection } from './collection';
import * as sequelize from 'sequelize-typescript';

@Table({ timestamps: false, tableName: 'item_configs' })
export class ItemConfigs extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.ForeignKey(() => Collection)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    collectionId!: number;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    type!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    label!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    hidden!: boolean;

    @sequelize.BelongsTo(() => Collection)
    collections!: Collection;
}
