import { Field } from './field';
import * as sequelize from 'sequelize-typescript';
import { Item } from './item';
import { User } from './user';
import { Theme } from './theme';
import { BelongsTo } from 'sequelize-typescript';

@sequelize.Table({
    timestamps: false,
    tableName: 'collections',
})
export class Collection extends sequelize.Model {
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
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    created!: number;

    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;

    @sequelize.BelongsTo(() => Theme)
    theme?: Theme;
    @sequelize.ForeignKey(() => Theme)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    themeId!: number;

    @sequelize.HasMany(() => Item, { onDelete: 'cascade' })
    items!: Item[];

    @sequelize.HasMany(() => Field)
    fields!: Field[];
}
