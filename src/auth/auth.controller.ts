import {Body, Controller, Post, Request, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local/local-auth.guard";
import {Public} from "./jwt/jwt-constants";
import {CreateUserDto} from "../users/dto/createUser.dto";
import {User} from "../users/users.model";
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOkResponse({
        description: "Authorization was successful",
    })
    @ApiUnauthorizedResponse({
        description: "Unauthorized"
    })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiCreatedResponse({
        type: User,
        description: "The user has been successfully created",
    })
    @ApiBadRequestResponse({
        description: "This user already exists"
    })
    @ApiBody({ type: CreateUserDto })
    @Post('registration')
    async registration(@Body() dto: CreateUserDto): Promise<User> {
        return await this.authService.registration(dto);
    }
}
