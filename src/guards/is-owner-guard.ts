import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Repository} from "sequelize-typescript";

@Injectable()
export class IsOwnerGuard implements CanActivate {
    constructor(private repository: Repository<any>) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const {user, params} = req;

        if (!user || !params) {
            return false;
        }

        const authUserId: number = user.id;
        const idItem: number = Number(params.id);

        const item = await this.repository.findByPk(idItem);

        if (!item) {
            return true;
        }

        return item.userId === authUserId;
    }
}
