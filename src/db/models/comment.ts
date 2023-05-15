import * as sequelize from 'sequelize-typescript';
import { Item } from './item';
import { User } from './user';
import { AfterBulkDestroy, AfterCreate } from 'sequelize-typescript';
import {
    addCommentIndex,
    removeCommentIndex,
} from '../../services/search.service';

@sequelize.Table({
    timestamps: false,
    tableName: 'comments',
})
export class Comment extends sequelize.Model {
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
    text!: string;

    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    created!: string;

    @sequelize.BelongsTo(() => Item)
    item?: Item;
    @sequelize.ForeignKey(() => Item)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    itemId!: number;

    @sequelize.BelongsTo(() => User)
    user!: User;
    @sequelize.ForeignKey(() => User)
    @sequelize.Column({
        type: sequelize.DataType.BIGINT,
        allowNull: false,
    })
    userId!: number;
    @AfterCreate
    static afterCreateHook(instance: Comment) {
        addCommentIndex(instance);
    }

    @AfterBulkDestroy
    static afterBulkDestroyHook(options: any): void {
        removeCommentIndex(options.where.id);
    }
}
