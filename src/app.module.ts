import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import {ListsModule} from './lists/lists.module';
import {List} from "./lists/lists.model";
import {CardsModule} from './cards/cards.module';
import {CommentsModule} from './comments/comments.module';
import {AuthModule} from './auth/auth.module';
import {Card} from "./cards/cards.model";
import {Comment} from "./comments/comments.model";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/jwt/jwt-auth.guard";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.HOST || "localhost",
        port: +process.env.DATABASE_PORT || 3000,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'root',
        database: process.env.DATABASE || 'trello-api',
        models: [User, List, Card, Comment],
        autoLoadModels: true
    }),
        ConfigModule.forRoot(),
        ListsModule, UsersModule, CardsModule, CommentsModule, AuthModule,
    ],
    controllers: [],
    providers: [{
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
    }],

})
export class AppModule {
}
