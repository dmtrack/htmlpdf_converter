import { StringField } from './field_types/stringfield';
import { Collection } from './collection';
import * as sequelize from 'sequelize-typescript';
import { FieldType } from './fieldtype';
import { TextField } from './field_types/textfield';
import { BooleanField } from './field_types/booleanfield';
import { DateField } from './field_types/datefield';
import { NumField } from './field_types/numfield';

@sequelize.Table({
    timestamps: false,
    tableName: 'fields',
})
export class Field extends sequelize.Model {
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
    label!: string;

    @sequelize.ForeignKey(() => Collection)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    collectionId!: number;

    @sequelize.ForeignKey(() => FieldType)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    typeId!: number;

    @sequelize.HasMany(() => StringField)
    stringfields!: StringField[];

    @sequelize.HasMany(() => TextField)
    textfields!: TextField[];

    @sequelize.HasMany(() => BooleanField)
    booleanfields!: BooleanField[];

    @sequelize.HasMany(() => DateField)
    datefields!: DateField[];

    @sequelize.HasMany(() => NumField)
    numfields!: NumField[];
}
