import {IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty({
        example: "Just do it",
        minLength: 2,
        maxLength: 20,
    })
    @IsString()
    @Length(2, 20)
    readonly title: string;

    @ApiProperty({
        example: "Do you really need a description?",
        minLength: 2,
        maxLength: 250,
    })
    @IsOptional()
    @IsString()
    @Length(2, 250)
    readonly description: string;
}