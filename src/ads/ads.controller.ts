import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';

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
    async createAdBuy(@Body() createAdDto: CreateAdDto) {
        const images = ['img1', 'img2', 'img3'];
        // console.log(dto);
        return this.adsService.createAd(createAdDto, images);
    }
}
