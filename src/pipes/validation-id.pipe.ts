import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidationIdPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): string {
        if (metadata.type !== 'param') {
            return value;
        }
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException('Invalid id format');
        }

        return value;
    }
}
