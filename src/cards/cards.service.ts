import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Card} from "./cards.model";
import {CreateCardDto} from "./dto/createCard.dto";
import {UpdateCardDto} from "./dto/updateCard.dto";

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card) private cardsRepository: typeof Card) {
    }

    async createCard(userId: number, listId: number, dto: CreateCardDto): Promise<Card> {
        return this.cardsRepository.create({...dto, userId, listId});
    }

    async getCards(listId: number): Promise<Card[]> {
        return this.cardsRepository.findAll({where: {listId}});
    }

    async getCard(listId: number, id: number): Promise<Card> {
        const card: Card = await this.cardsRepository.findOne({where: {listId, id}});
        if (!card) {
            throw new HttpException(`Card not found`, HttpStatus.NOT_FOUND);
        }
        return card;
    }

    async updateCard(listId: number, id: number,
                     dto: UpdateCardDto): Promise<Card> {
        const card: Card = await this.getCard(listId, id);
        return card.update(dto);
    }

    async removeCard(listId: number, id: number): Promise<void> {
        const card: Card = await this.getCard(listId, id);
        return card.destroy();
    }

    async findById(id: number): Promise<Card> {
        return this.cardsRepository.findByPk(id);
    }
}
