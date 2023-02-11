import * as sequelize from 'sequelize-typescript';

@sequelize.Table({
    timestamps: false,
    tableName: 'tags',
})
export class Tag extends sequelize.Model {
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
}
