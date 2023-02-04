import * as sequelize from 'sequelize-typescript';
import { User } from './users';

@sequelize.Table({
    timestamps: false,
    tableName: 'user_access',
})
export class Access extends sequelize.Model {
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
        allowNull: true,
    })
    access!: string;

    @sequelize.BelongsTo(() => User)
    user!: User;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;
}
