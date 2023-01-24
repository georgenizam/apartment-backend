import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { imageFileFilter } from '../utils/image-file-filter/imageFileFilter';
import { AdsService } from './ads.service';
import { FILES_MAX_COUNT, FILE_MAX_SIZE } from './constants/image-files.constants';
import { CreateAdDto } from './dto/create-ad.dto';
import { GetAllQueryDto } from './dto/getall-query.dto';

@ApiTags('Ads')
@Controller('ads')
export class AdsController {
    constructor(private adsService: AdsService) {}

    @ApiOperation({ summary: 'Get all ads' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAllAds(@Query() getAllQueryDto: GetAllQueryDto) {
        return this.adsService.getAllAd(getAllQueryDto);
    }

    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    @ApiOperation({ summary: 'Get ad by id' })
    @Get(':id')
    async getAdById(@Param('id') id: string) {
        return this.adsService.getAdById(id);
    }

    @ApiOperation({ summary: 'Create ad' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
    @ApiConsumes('multipart/form-data')
    @Post()
    @UseInterceptors(
        FilesInterceptor('files', FILES_MAX_COUNT, {
            limits: {
                files: FILES_MAX_COUNT,
                fileSize: FILE_MAX_SIZE,
            },
            fileFilter: imageFileFilter,
        })
    )
    async createAd(
        @Req() req: Request,
        @Body() createAdDto: CreateAdDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.adsService.createAd(createAdDto, files);
    }
}
