import * as sequelize from 'sequelize-typescript';
import { Item } from './items';
import { User } from './users';

@sequelize.Table({
    timestamps: false,
    tableName: 'tokens',
})
export class Token extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
    refreshToken!: string;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;
}
