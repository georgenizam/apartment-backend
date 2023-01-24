import { BadRequestException } from '@nestjs/common';
import { IMAGE_FILE_VALIDATION_ERROR } from './imageFileFilter.constants';

const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

export const imageFileFilter = (req: Request, file: Express.Multer.File, done: any) => {
    if (!mimeTypes.includes(file.mimetype)) {
        done(new BadRequestException(IMAGE_FILE_VALIDATION_ERROR), false);
    }

    done(null, true);
};
