import { Role } from '../types/role.enum';

export type AccessTokenPayload = {
    userId: string;
    email: string;
    roles: Role[];
};

export type RefreshTokenPayload = {
    sid: string;
};

export type Tokens = {
    accessToken: string;
    refreshToken: string;
};
