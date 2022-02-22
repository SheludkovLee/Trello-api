import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: "user@gmail.com",
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: "password123",
        minLength: 8,
        maxLength: 50,
    })
    @IsString()
    @Length(8, 50)
    readonly password: string;
}