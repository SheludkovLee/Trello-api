import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {ListsService} from "./lists.service";
import {List} from "./lists.model";
import {CreateListDto} from "./dto/createList.dto";
import {UpdateListDto} from "./dto/updateList.dto";
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {IsOwnerGuard} from "../guards/is-owner-guard";
import {IsMyAccountGuard} from "../guards/is-my-account.guard";

@ApiTags('lists')
@ApiUnauthorizedResponse({
    description: "Unauthorized"
})
@Controller('users/:userId/lists')
export class ListsController {

    constructor(private listsService: ListsService) {
    }

    @ApiCreatedResponse({
        type: List,
        description: "The list has been successfully created"
    })
    @ApiForbiddenResponse({
        description: "Forbidden"
    })
    @UseGuards(IsMyAccountGuard)
    @Post()
    create(@Param('userId', ParseIntPipe) userId: number,
           @Body() dto: CreateListDto): Promise<List> {
        return this.listsService.createList(userId, dto);
    }

    @ApiOkResponse({
        isArray: true,
        type: List,
        description: "Get lists",
    })
    @Get()
    getAll(@Param('userId', ParseIntPipe) userId: number): Promise<List[]> {
        return this.listsService.getLists(userId);
    }

    @ApiOkResponse({
        type: List,
        description: "Get list",
    })
    @ApiNotFoundResponse({
        description: "List not found"
    })
    @Get(':id')
    get(@Param('userId', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number): Promise<List> {
        return this.listsService.getList(userId, id);
    }

    @ApiOkResponse({
        description: "Update list",
    })
    @ApiNotFoundResponse({
        description: "List not found"
    })
    @ApiForbiddenResponse({
        description: "Forbidden"
    })
    @UseGuards(new IsOwnerGuard(List))
    @Patch(':id')
    update(@Param('userId', ParseIntPipe) userId: number,
           @Param('id', ParseIntPipe) id: number,
           @Body() dto: UpdateListDto): Promise<List> {
        return this.listsService.updateList(userId, id, dto);
    }

    @ApiOkResponse({
        description: "Delete list",
    })
    @ApiNotFoundResponse({
        description: "List not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @UseGuards(new IsOwnerGuard(List))
    @Delete(':id')
    remove(@Param('userId', ParseIntPipe) userId: number,
           @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.listsService.removeList(userId, id);
    }
}
