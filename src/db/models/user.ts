import { Collection } from './collection';
import { Comment } from './comment';
import * as sequelize from 'sequelize-typescript';
import { Access } from './user_access';
import { Token } from './token';
import { Like } from './like';

@sequelize.Table({
    timestamps: false,
    tableName: 'users',
})
export class User extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    blocked!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    accessId!: number;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    tokenId!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
    avatarUrl!: string;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    isActivated!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: true,
    })
    activationLink!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: true,
    })
    created!: number;

    @sequelize.HasMany(() => Collection, { onDelete: 'cascade' })
    userCollections!: Collection[];

    @sequelize.HasMany(() => Comment, { onDelete: 'cascade' })
    comments!: Comment[];

    @sequelize.HasOne(() => Access, { onDelete: 'cascade' })
    access!: Access;

    @sequelize.HasOne(() => Token, { onDelete: 'cascade' })
    token!: Token;

    @sequelize.HasMany(() => Like, { onDelete: 'cascade' })
    likes!: Like[];
}
