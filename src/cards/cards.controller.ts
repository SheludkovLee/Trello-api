import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CardsService} from "./cards.service";
import {CreateCardDto} from "./dto/createCard.dto";
import {Card} from "./cards.model";
import {UpdateCardDto} from "./dto/updateCard.dto";
import {
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ReqUser} from "../auth/user.param-decorator";
import {IsOwnerGuard} from "../guards/is-owner-guard";

@ApiTags('cards')
@ApiUnauthorizedResponse({
    description: "Unauthorized"
})
@Controller('lists/:listId/cards')
export class CardsController {
    constructor(private cardsService: CardsService) {
    }

    @ApiCreatedResponse({
        type: Card,
        description: "The list has been successfully created"
    })
    @ApiParam({
        name: "listId",
        example: 1
    })
    @ApiBody({type: CreateCardDto})
    @Post()
    create(@ReqUser() user,
           @Param('listId', ParseIntPipe) listId: number,
           @Body() dto: CreateCardDto): Promise<Card> {
        return this.cardsService.createCard(user.id, listId, dto);
    }

    @ApiOkResponse({
        isArray: true,
        type: Card,
        description: "Get cards",
    })
    @ApiParam({
        name: "listId",
        example: 1
    })
    @ApiBody({type: CreateCardDto})
    @Get()
    getAll(@Param('listId', ParseIntPipe) listId: number): Promise<Card[]> {
        return this.cardsService.getCards(listId);
    }

    @ApiOkResponse({
        type: Card,
        description: "Get card",
    })
    @ApiNotFoundResponse({
        description: "Card not found"
    })
    @ApiParam({
        name: "listId",
        example: 1
    })
    @ApiParam({
        name: "id",
        example: 1
    })
    @Get(':id')
    get(@Param('listId', ParseIntPipe) listId: number,
        @Param('id', ParseIntPipe) id: number): Promise<Card> {
        return this.cardsService.getCard(id, listId);
    }

    @ApiOkResponse({
        type: Card,
        description: "Update card",
    })
    @ApiNotFoundResponse({
        description: "Card not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiParam({
        name: "listId",
        example: 1
    })
    @ApiParam({
        name: "id",
        example: 1
    })
    @ApiBody({type: UpdateCardDto})
    @UseGuards(new IsOwnerGuard(Card))
    @Patch(':id')
    update(@Param('listId', ParseIntPipe) listId: number,
           @Param('id', ParseIntPipe) id: number,
           @Body() dto: UpdateCardDto): Promise<Card> {
        return this.cardsService.updateCard(listId, id, dto);
    }

    @ApiOkResponse({
        description: "Delete card",
    })
    @ApiNotFoundResponse({
        description: "Card not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden.'})
    @ApiParam({
        name: "listId",
        example: 1
    })
    @ApiParam({
        name: "id",
        example: 1
    })
    @UseGuards(new IsOwnerGuard(Card))
    @Delete(':id')
    remove(@Param('listId', ParseIntPipe) listId: number,
           @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.cardsService.removeCard(listId, id);
    }
}
