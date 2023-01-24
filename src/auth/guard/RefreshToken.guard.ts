import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenJwtAuthGuard extends AuthGuard('refresh-token-jwt') {}
