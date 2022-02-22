import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateListDto {
    @ApiProperty({
        example: "IN PROGRESS",
        minLength: 2,
        maxLength: 20,
    })
    @IsString()
    @Length(2, 20)
    readonly title: string;
}