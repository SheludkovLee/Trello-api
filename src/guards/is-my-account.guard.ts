import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class IsMyAccountGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const {user, params} = req;

        if (!user || !params) {
            return false;
        }

        const authUserId = user.id;
        const authorId = Number(params.userId);

        return authUserId === authorId;
    }
}