import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        example: "I love the smell of napalm in the morning",
        minLength: 2,
        maxLength: 20
    })
    @IsString()
    @Length(2, 20)
    readonly text: string;
}