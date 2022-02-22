import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';

import {CreateUserDto} from "./dto/createUser.dto";
import {UsersService} from "./users.service";
import {User} from "./users.model";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse, ApiOkResponse,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {IsMyAccountGuard} from "../guards/is-my-account.guard";

@ApiTags('users')
@ApiUnauthorizedResponse({
    description: "Unauthorized"
})
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiCreatedResponse({
        type: User,
        description: "The user has been successfully created"
    })
    @ApiBadRequestResponse({
        description: "This user already exists"
    })

    @Post()
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.userService.createUser(dto);
    }

    @ApiOkResponse({
        isArray: true,
        type: [User],
        description: "Get users",
    })
    @Get()
    getAll() {
        return this.userService.getUsers();
    }

    @ApiOkResponse({
        type: User,
        description: "Get user"
    })
    @ApiNotFoundResponse({
        description: "User not found"
    })
    @Get(':userId')
    get(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
        return this.userService.getUser(userId);
    }

    @ApiOkResponse({
        type: User,
        description: "Update user",
    })
    @ApiNotFoundResponse({
        description: "User not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @UseGuards(IsMyAccountGuard)
    @Patch(':userId')
    update(@Param('userId', ParseIntPipe) userId: number,
           @Body() dto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(userId, dto);
    }

    @ApiOkResponse({
        description: "Delete user",
    })
    @ApiNotFoundResponse({
        description: "User not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @UseGuards(IsMyAccountGuard)
    @Delete(':userId')
    remove(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
        return this.userService.removeUser(userId);
    }
}
