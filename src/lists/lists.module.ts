import {Module} from '@nestjs/common';
import {ListsController} from './lists.controller';
import {ListsService} from './lists.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {List} from "./lists.model";

@Module({
    controllers: [ListsController],
    providers: [ListsService],
    imports: [
        SequelizeModule.forFeature([List])
    ]
})
export class ListsModule {
}
