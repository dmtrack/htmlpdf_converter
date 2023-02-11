import * as sequelize from 'sequelize-typescript';
import { Collection } from './collection';
import { Item } from './item';

@sequelize.Table({
    timestamps: false,
    tableName: 'themes',
})
export class Theme extends sequelize.Model {
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

    @sequelize.HasMany(() => Collection)
    collections!: Collection[];
}
