import { Injectable } from '@nestjs/common';
import { path as rootPath } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { nanoid } from 'nanoid/async';
import { join } from 'path';
import { extension } from 'mime-types';
import sharp from 'sharp';
import {
    ADS_UPLOAD_FOLDER,
    DEFAULT_FOLDER,
    DEFAULT_USERS_FOLDER,
    ROOT_UPLOAD_FOLDER,
    USERS_UPLOAD_FOLDER,
} from './constants/media.constants';
import { FileItemRespose } from './types/file-item.respose.type';

@Injectable()
export class MediaService {
    async saveUserImage(file: Express.Multer.File): Promise<FileItemRespose> {
        const [savedImage] = await this.saveToLocal([file], USERS_UPLOAD_FOLDER);
        return savedImage;
    }

    async saveAdsMedia(files: Express.Multer.File[], adId = ''): Promise<FileItemRespose[]> {
        return this.saveToLocal(files, join(ADS_UPLOAD_FOLDER, adId));
    }

    private async saveToLocal(
        files: Express.Multer.File[],
        subfolder = ''
    ): Promise<FileItemRespose[]> {
        const uploadFolderPathFull = join(rootPath, ROOT_UPLOAD_FOLDER, subfolder);
        const res: FileItemRespose[] = [];

        await ensureDir(uploadFolderPathFull);

        const promises = [];
        for (const fileItem of files) {
            const filename = `${await nanoid()}.${extension(fileItem.mimetype)}`;
            const pathFile = join(uploadFolderPathFull, filename);

            promises.push(async () => {
                const imageOptimized = await this.optimizeImage(fileItem.buffer);
                await writeFile(pathFile, imageOptimized);
            });

            res.push({
                filename,
                path: join(subfolder, filename),
                mimetype: fileItem.mimetype,
            });
        }

        await Promise.all(promises.map((promiseItem) => promiseItem()));

        return res;
    }

    private async optimizeImage(file: Buffer): Promise<Buffer> {
        const image = sharp(file);
        const meta = await image.metadata();
        const { format } = meta;

        const config = {
            jpeg: { quality: 70 },
            webp: { quality: 70 },
            png: { quality: 70 },
        };

        return image[format](config[format]).toBuffer();
    }
}
