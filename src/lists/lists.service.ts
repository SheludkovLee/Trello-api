import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {List} from "./lists.model";
import {CreateListDto} from "./dto/createList.dto";
import {UpdateListDto} from "./dto/updateList.dto";
import {Comment} from "../comments/comments.model";

@Injectable()
export class ListsService {
    constructor(@InjectModel(List) private listRepository: typeof List) {
    }

    async createList(userId: number, dto: CreateListDto) {
        return await this.listRepository.create({...dto, userId});
    }

    async getLists(userId: number): Promise<List[]> {
        return this.listRepository.findAll({where: {userId}});
    }

    async getList(userId: number, id: number): Promise<List> {
        const list: List = await this.listRepository.findOne({where: {id, userId}});
        if (!list) {
            throw new HttpException(`List not found`, HttpStatus.NOT_FOUND);
        }
        return list;
    }

    async updateList(userId: number, id: number, dto: UpdateListDto): Promise<List> {
        const list: List = await this.getList(userId, id);
        return list.update(dto);
    }

    async removeList(userId: number, id: number): Promise<void> {
        const list: List = await this.getList(userId, id);
        return list.destroy();
    }
}
