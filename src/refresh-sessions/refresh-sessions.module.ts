import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshSessionsService } from './refresh-sessions.service';
import { RefreshSession, RefreshSessionSchema } from './schemas/refresh-session.schema';

@Module({
    providers: [RefreshSessionsService],
    imports: [
        MongooseModule.forFeature([
            {
                name: RefreshSession.name,
                schema: RefreshSessionSchema,
            },
        ]),
        ConfigModule,
    ],
    exports: [RefreshSessionsService],
})
export class RefreshSessionsModule {}
