import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/common/decorator/roles.decorator";
import { Role } from "src/common/enum/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) { }
    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
        if (!requiredRoles) {
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return requiredRoles.some((role) => user.roles?.includes(role));
    };
}