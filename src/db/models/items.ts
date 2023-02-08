import * as sequelize from 'sequelize-typescript';
import { Collection } from './collections';
import { Comment } from './comments';
import { Tag } from './tags';

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

    @sequelize.HasMany(() => Comment)
    comments!: Comment[];

    @sequelize.HasMany(() => Tag)
    tags!: Tag[];

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
    str1!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
    str2!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
    str3!: string;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
    txt1!: string;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
    txt2!: string;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
        allowNull: true,
    })
    txt3!: string;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: true,
    })
    num1!: number;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: true,
    })
    num2!: number;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: true,
    })
    num3!: number;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: true,
    })
    bool1!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: true,
    })
    bool2!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: true,
    })
    bool3!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
    date1!: string;

    @sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
    date2!: string;

    @sequelize.Column({
        type: sequelize.DataType.DATEONLY,
        allowNull: true,
    })
    date3!: string;
}
