import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "./jwt/jwt-constants";
import {JwtStrategy} from "./jwt/jwt-strategy";
import {LocalStrategy} from "./local/local.strategy";
import {HashService} from "./hash.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, HashService],
  exports: [AuthService, HashService],
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {
              expiresIn: '24h'
          }
      }),
  ]
})
export class AuthModule {}
