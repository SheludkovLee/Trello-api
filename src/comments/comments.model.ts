import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Card} from "../cards/cards.model";
import {ApiProperty} from "@nestjs/swagger";

interface CommentCreationAttrs {
    text: string;
    cardId: number;
    userId: number;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @ApiProperty()
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({
        example: "I love the smell of napalm in the morning",
        minLength: 2,
        maxLength: 20
    })
    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ApiProperty()
    @ForeignKey(() => Card)
    @Column({type: DataType.INTEGER, allowNull: false})
    cardId: number;

    @BelongsTo(() => Card)
    card: Card;

    @ApiProperty()
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    author: User;
}
