import { Request } from 'express';
import { Role } from './role.enum';
import { AccessTokenPayload } from './token.type';

export interface RequestWithUser extends Request {
    user: AccessTokenPayload;
}

export interface RequestWithUserAT extends Request {
    user: unknown;
}

export interface RequestWithUserRT extends Request {
    user: {
        userId: string;
        roles: Role[];
    };
}
