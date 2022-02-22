import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "./comments.model";
import {CreateCommentDto} from "./dto/createComment.dto";
import {UpdateCommentDto} from "./dto/updateComment.dto";
import {Card} from "../cards/cards.model";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {
    }

    async createComment(userId: number, cardId: number,
                        dto: CreateCommentDto): Promise<Comment> {
        return this.commentRepository.create({...dto, userId, cardId});
    }

    async getComments(cardId: number): Promise<Comment[]> {
        return this.commentRepository.findAll({where: {cardId},});
    }

    async getComment(cardId: number, id: number): Promise<Comment> {
        const comment: Comment = await this.commentRepository.findOne({
            where: {cardId, id}
        });
        if (!comment) {
            throw new HttpException(`Comment not found`, HttpStatus.NOT_FOUND);
        }
        return comment;
    }

    async updateComment(cardId: number, id: number,
                        dto: UpdateCommentDto): Promise<Comment> {
        const comment: Comment = await this.getComment(cardId, id);
        return comment.update(dto);
    }

    async removeComment(cardId: number, id: number): Promise<void> {
        const comment: Comment = await this.getComment(cardId, id);
        return comment.destroy();
    }

    async findById(id: number): Promise<Comment> {
        return this.commentRepository.findByPk(id);
    }
}

