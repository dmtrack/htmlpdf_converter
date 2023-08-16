import * as sequelize from 'sequelize-typescript';

@sequelize.Table({
    timestamps: false,
    tableName: 'logs',
})
export class Log extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING(4096),
        allowNull: false,
    })
    description!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    image!: string;
    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    themeName!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    created!: number;
}
