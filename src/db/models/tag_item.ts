import * as sequelize from 'sequelize-typescript';
import { Item } from './item';
import { Tag } from './tag';

@sequelize.Table({
    timestamps: false,
    tableName: 'tagitems',
})
export class TagItem extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.BelongsTo(() => Item)
    item?: Item;
    @sequelize.ForeignKey(() => Item)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    itemId!: number;

    @sequelize.ForeignKey(() => Tag)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    tagId!: number;
}
