import * as sequelize from 'sequelize-typescript';
import { Item } from './items';
import { User } from './users';

@sequelize.Table({
    timestamps: false,
    tableName: 'comments',
})
export class Comment extends sequelize.Model {
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
    text!: string;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    @sequelize.ForeignKey(() => Item)
    itemId!: number;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    @sequelize.ForeignKey(() => User)
    userId!: number;
}
