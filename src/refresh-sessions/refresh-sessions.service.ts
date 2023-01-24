import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ms from 'ms';
import { CreateRefreshSessionsDto } from './dto/create-refresh-sessions.dto';
import { RefreshSession, RefreshSessionDocument } from './schemas/refresh-session.schema';

const MAX_REFRESH_SESSIONS_COUNT = 5;

@Injectable()
export class RefreshSessionsService {
    constructor(
        @InjectModel(RefreshSession.name)
        private refreshSessionModel: Model<RefreshSessionDocument>,
        private configService: ConfigService
    ) {}

    async addSession(createRefreshSessionsDto: CreateRefreshSessionsDto): Promise<RefreshSession> {
        const { userId } = createRefreshSessionsDto;
        const isValidSessions = await this.isValidSessionsCount(userId);
        if (!isValidSessions) {
            await this.removeAllSessionsUser(userId);
        }

        return this.createSession(createRefreshSessionsDto);
    }

    async getSessionByToken(refreshToken: string): Promise<RefreshSession | null> {
        const session = await this.refreshSessionModel.findOne({ refreshToken }).lean();

        return session;
    }

    async removeSessionByRefreshToken(refreshToken: string) {
        const session = await this.refreshSessionModel.findOneAndDelete({ refreshToken });

        if (!session) {
            throw new NotFoundException('Error remove session');
        }
    }

    private async isValidSessionsCount(userId: string): Promise<boolean> {
        const sessionsNow = await this.refreshSessionModel.find({ userId }).lean();
        return sessionsNow.length < MAX_REFRESH_SESSIONS_COUNT;
    }

    private async createSession(
        createRefreshSessionsDto: CreateRefreshSessionsDto
    ): Promise<RefreshSession> {
        const session = await this.refreshSessionModel.create({
            ...createRefreshSessionsDto,
            expireAt: new Date(
                Date.now() + ms(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'))
            ),
        });

        return session;
    }

    private async removeAllSessionsUser(userId: string) {
        await this.refreshSessionModel.deleteMany({ userId });
    }
}
