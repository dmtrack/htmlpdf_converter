import * as sequelize from 'sequelize-typescript';
import { Collection } from './collection';
import { Comment } from './comment';
import { Like } from './like';
import {
    AfterBulkDestroy,
    AfterBulkUpdate,
    AfterCreate,
} from 'sequelize-typescript';
import {
    addItemIndex,
    removeItemIndex,
    uploadItemIndex,
} from '../../services/search.service';

import { ItemsTags } from './ItemsTags';
import { Tag } from './tag';

@sequelize.Table({
    timestamps: false,
    tableName: 'items',
})
export class Item extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    created!: number;

    @sequelize.BelongsTo(() => Collection)
    collection!: Collection;
    @sequelize.ForeignKey(() => Collection)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    collectionId!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING(255),
        allowNull: true,
    })
    image!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    str1!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    str2!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
    })
    str3!: string;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
    })
    txt1!: string;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
    })
    txt2!: string;

    @sequelize.Column({
        type: sequelize.DataType.TEXT,
    })
    txt3!: string;

    @sequelize.Column({
        type: sequelize.DataType.DECIMAL,
    })
    numb1!: number;

    @sequelize.Column({
        type: sequelize.DataType.DECIMAL,
    })
    numb2!: number;

    @sequelize.Column({
        type: sequelize.DataType.DECIMAL,
    })
    numb3!: number;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
    bool1!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
    bool2!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
    })
    bool3!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
    })
    date1!: string;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
    })
    date2!: string;

    @sequelize.Column({
        type: sequelize.DataType.DATE,
    })
    date3!: string;

    @sequelize.BelongsToMany(() => Tag, () => ItemsTags)
    tags!: Tag[];

    @sequelize.HasMany(() => ItemsTags, { onDelete: 'cascade' })
    itemTags!: ItemsTags[];

    @sequelize.HasMany(() => Comment, { onDelete: 'cascade' })
    comments!: Comment[];

    @sequelize.HasMany(() => Like, { onDelete: 'cascade' })
    likes!: Like[];

    @AfterCreate
    static afterCreateHook(instance: Item) {
        addItemIndex(instance);
    }

    @AfterBulkUpdate
    static afterBulkUpdateHook(options: any) {
        uploadItemIndex(options.attributes);
    }

    @AfterBulkDestroy
    static afterBulkDestroyHook(options: any): void {
        removeItemIndex(options.where.id);
    }
}
