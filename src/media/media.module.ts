import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path as rootPath } from 'app-root-path';
import { join } from 'path';
import { ROOT_UPLOAD_FOLDER, SERVE_ROOT } from './constants/media.constants';
import { MediaService } from './media.service';

@Module({
    providers: [MediaService],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(rootPath, ROOT_UPLOAD_FOLDER),
            serveRoot: SERVE_ROOT,
        }),
    ],
    exports: [MediaService],
})
export class MediaModule {}
