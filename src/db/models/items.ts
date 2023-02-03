import * as sequelize from 'sequelize-typescript';
import { ForeignKey } from 'sequelize-typescript';
import { Col } from 'sequelize/types/utils';
import { Collection } from './collections';

@sequelize.Table({
    timestamps: false,
    tableName: 'items',
})
export class Item extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @sequelize.BelongsTo(() => Collection)
    collection!: Collection;

    @sequelize.ForeignKey(() => Collection)
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    collectionId!: number;
}
