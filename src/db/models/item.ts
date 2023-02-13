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

@sequelize.Table({
    timestamps: false,
    tableName: 'item',
})
export class Item extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
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

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    created!: number;

    @sequelize.ForeignKey(() => Collection)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    collectionId!: number;

    @sequelize.HasMany(() => Comment)
    comments!: Comment[];

    @sequelize.HasMany(() => TagItem)
    tags!: TagItem[];

    @sequelize.HasMany(() => Like)
    likes!: Like[];

    @sequelize.HasMany(() => StringField)
    stringfields!: StringField[];

    @sequelize.HasMany(() => TextField)
    textfields!: TextField[];

    @sequelize.HasMany(() => BooleanField)
    boolean!: BooleanField[];

    @sequelize.HasMany(() => NumField)
    numfields!: NumField[];

    @sequelize.HasMany(() => DateField)
    datefields!: DateField[];
}
