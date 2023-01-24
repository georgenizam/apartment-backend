import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenJwtAuthGuard extends AuthGuard('access-token-jwt') {}
