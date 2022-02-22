import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {HashService} from "../auth/hash.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, HashService],
    imports: [
        SequelizeModule.forFeature([User]),
        HashService,
    ],
    exports: [UsersService]
})
export class UsersModule {
}
