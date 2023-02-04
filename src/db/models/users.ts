import { Collection } from './collections';
import { Comment } from './comments';
import * as sequelize from 'sequelize-typescript';
import { Access } from './user_access';
import { Token } from './token';

@sequelize.Table({
    timestamps: false,
    tableName: 'users',
})
export class User extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
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
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    accessId!: number;

    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        allowNull: false,
    })
    tokenId!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    avatarUrl!: string;

    @sequelize.Column({
        type: sequelize.DataType.BOOLEAN,
        allowNull: false,
    })
    isActivated!: boolean;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    activationLink!: string;

    @sequelize.HasMany(() => Collection)
    userCollections!: Collection[];

    @sequelize.HasMany(() => Comment)
    comments!: Comment[];

    @sequelize.HasOne(() => Access)
    access!: Access;

    @sequelize.HasOne(() => Token)
    token!: Token;
}
