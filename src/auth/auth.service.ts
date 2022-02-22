import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/createUser.dto";
import {User} from "../users/users.model";
import {UsersService} from "../users/users.service";
import {HashService} from "./hash.service";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private hashService: HashService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isRealPassword = await this.hashService.compareHash(password, user.password);
        if (user && isRealPassword) {
            return {
                id: user.id,
                email: user.email
            }
        }
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async registration(dto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(dto);
    }
}
