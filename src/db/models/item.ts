import { TextField } from './field_types/textfield';
import { StringField } from './field_types/stringfield';
import { DateField } from './field_types/datefield';
import * as sequelize from 'sequelize-typescript';
import { Collection } from './collection';
import { Comment } from './comment';
import { TagItem } from './tag_item';
import { BooleanField } from './field_types/booleanfield';
import { NumField } from './field_types/numfield';
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
import { User } from './user';

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

    @sequelize.HasMany(() => Comment, { onDelete: 'cascade' })
    comments!: Comment[];

    @sequelize.HasMany(() => TagItem)
    tags!: TagItem[];

    @sequelize.HasMany(() => Like, { onDelete: 'cascade' })
    likes!: Like[];

    @sequelize.HasMany(() => StringField, { onDelete: 'cascade' })
    stringfields!: StringField[];

    @sequelize.HasMany(() => TextField, { onDelete: 'cascade' })
    textfields!: TextField[];

    @sequelize.HasMany(() => BooleanField, { onDelete: 'cascade' })
    boolean!: BooleanField[];

    @sequelize.HasMany(() => NumField, { onDelete: 'cascade' })
    numfields!: NumField[];

    @sequelize.HasMany(() => DateField, { onDelete: 'cascade' })
    datefields!: DateField[];

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
