import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../types/request-with-user.type';
import { Role } from '../types/role.enum';
import { AccessTokenJwtAuthGuard } from './AccessToken.guard';

export const RoleGuard = (roles: Role[]): Type<CanActivate> => {
    class RoleGuardMixin extends AccessTokenJwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest<RequestWithUser>();
            const user = request.user;

            return roles.every((roleItem) => user?.roles?.includes(roleItem));
        }
    }

    return mixin(RoleGuardMixin);
};
