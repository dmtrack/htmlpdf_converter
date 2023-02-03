import * as sequelize from 'sequelize-typescript';
import { Item } from './items';

@sequelize.Table({
    timestamps: false,
    tableName: 'tags',
})
export class Tag extends sequelize.Model {
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
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    @sequelize.ForeignKey(() => Item)
    itemId!: number;
}
