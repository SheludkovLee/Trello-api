import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/createUser.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {HashService} from "../auth/hash.service";
import {List} from "../lists/lists.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private hashService: HashService) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const candidate: User = await this.findByEmail(dto.email);
        if (candidate) {
            throw new HttpException(`User with email: ${dto.email} already exists`, HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await this.hashService.hashPassword(dto.password);
        return await this.userRepository.create({...dto, password: hashPassword});
    }

    async getUser(id: number): Promise<User> {
        const user: User = await this.userRepository.findByPk(id);
        if (!user) {
            throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        const user: User = await this.getUser(id);
        if (user && await this.hashService.compareHash(dto.password, user.password)) {
            const {password, ...data} = dto;
            return await user.update(data);
        }
        const hashPassword = await this.hashService.hashPassword(dto.password);

        return await user.update({...dto, password: hashPassword});
    }

    async removeUser(id: number): Promise<void> {
        const user: User = await this.getUser(id);
        return await user.destroy();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({where: {email}});
    }
}

