import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v2 } from 'cloudinary';

@Controller('ads')
export class AdsController {
    constructor(private adsService: AdsService) {}

    @Get()
    async getAllAds() {
        return this.adsService.getAllAd();
    }
    @Get(':id')
    async getAdById(@Param('id') id: string) {
        return this.adsService.getAdById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FilesInterceptor('files'))
    async createAd(
        @Body() createAdDto: CreateAdDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        // console.log('files = ', files);
        return this.adsService.createAd(createAdDto, files);
    }
}
