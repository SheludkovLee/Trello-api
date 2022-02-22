import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/createComment.dto";
import {Comment} from "./comments.model";
import {UpdateCommentDto} from "./dto/updateComment.dto";
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ReqUser} from "../auth/user.param-decorator";
import {IsOwnerGuard} from "../guards/is-owner-guard";

@ApiTags('comments')
@ApiUnauthorizedResponse({
    description: "Unauthorized"
})
@Controller('cards/:cardId/comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {
    }

    @ApiCreatedResponse({
        type: Comment,
        description: "The comment has been successfully created",
    })
    @Post()
    create(@ReqUser() user,
           @Param('cardId', ParseIntPipe) cardId: number,
           @Body() dto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.createComment(user.id, cardId, dto);
    }

    @ApiOkResponse({
        isArray: true,
        type: Comment,
        description: "Get comments",
    })
    @Get()
    getAll(@Param('cardId', ParseIntPipe) cardId: number): Promise<Comment[]> {
        return this.commentsService.getComments(cardId);
    }

    @ApiOkResponse({
        type: Comment,
        description: "Get comment",
    })
    @ApiNotFoundResponse({
        description: "Comment not found"
    })
    @Get(':id')
    get(@Param('cardId', ParseIntPipe) cardId: number,
        @Param('id', ParseIntPipe) id: number): Promise<Comment> {
        return this.commentsService.getComment(cardId, id);
    }

    @ApiOkResponse({
        type: Comment,
        description: "Update comment",
    })
    @ApiNotFoundResponse({
        description: "Comment not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden'})
    @UseGuards(new IsOwnerGuard(Comment))
    @Patch(':id')
    update(@Param('cardId', ParseIntPipe) cardId: number,
           @Param('id', ParseIntPipe) id: number,
           @Body() dto: UpdateCommentDto): Promise<Comment> {
        return this.commentsService.updateComment(cardId, id, dto);
    }

    @ApiOkResponse({
        type: Comment,
        description: "Delete comment",
    })
    @ApiNotFoundResponse({
        description: "Comment not found"
    })
    @ApiForbiddenResponse({description: 'Forbidden'})
    @UseGuards(new IsOwnerGuard(Comment))
    @Delete(':id')
    remove(@Param('cardId', ParseIntPipe) cardId: number,
           @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.commentsService.removeComment(cardId, id);
    }
}
