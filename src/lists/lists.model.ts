import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Card} from "../cards/cards.model";
import {ApiProperty} from "@nestjs/swagger";

interface ListCreationAttrs {
    title: string;
    userId: number;
}

@Table({tableName: 'lists'})
export class List extends Model<List, ListCreationAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({
        example: "IN PROGRESS",
        minLength: 2,
        maxLength: 20,
    })
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty()
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @HasMany(() => Card)
    cards: Card[];

    @BelongsTo(() => User)
    author: User;
}
