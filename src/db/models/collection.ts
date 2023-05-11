import { Field } from './field';
import * as sequelize from 'sequelize-typescript';
import { Item } from './item';
import { User } from './user';
import { Theme } from './theme';
import { AfterCreate, BelongsTo } from 'sequelize-typescript';
import {
    addCollectionIndex,
    removeCollectionIndex,
    uploadCollectionIndex,
} from '../../services/search.service';

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
        type: sequelize.DataType.STRING(255),
        allowNull: false,
    })
    themeName!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    created!: number;

    @sequelize.BelongsTo(() => User)
    user?: User;
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

    @AfterCreate
    static afterCreateHook(instance: Collection) {
        addCollectionIndex(instance);
    }

    @sequelize.AfterBulkUpdate
    static afterBulkUpdateHook(options: any) {
        uploadCollectionIndex(options.attributes);
    }

    @sequelize.AfterBulkDestroy
    static afterBulkDestroyHook(options: any): void {
        removeCollectionIndex(options.where.id);
    }
}
