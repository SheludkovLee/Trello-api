import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {List} from "../lists/lists.model";
import {Card} from "../cards/cards.model";
import {Comment} from "../comments/comments.model";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({
        example: "user@gmail.com"
    })
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({
        example: "password123",
        minLength: 8,
        maxLength: 50,
    })
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => List)
    lists: List[];

    @HasMany(() => Card)
    cards: Card[]

    @HasMany(() => Comment)
    comments: Comment[];
}