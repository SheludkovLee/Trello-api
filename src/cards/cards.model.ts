import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {List} from "../lists/lists.model";
import {Comment} from "../comments/comments.model";
import {ApiProperty} from "@nestjs/swagger";

interface CardCreationAttrs {
    title: string;
    userId: number;
    listId: number;
}

@Table({tableName: 'cards'})
export class Card extends Model<Card, CardCreationAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({
        example: "Just do it",
        minLength: 2,
        maxLength: 20,
    })
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({
        example: "Do you really need a description?",
        minLength: 2,
        maxLength: 250,
    })
    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @HasMany(() => Comment)
    comments: Comment[];

    @ApiProperty()
    @ForeignKey(() => List)
    @Column({type: DataType.INTEGER, allowNull: false})
    listId: number;

    @BelongsTo(() => List)
    list: List;

    @ApiProperty()
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
