import {Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt"


@Injectable()
export class HashService {
    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async compareHash(password: string, hash: string) {
        const is = await bcrypt.compare(password, hash)
        return is;
    }
}