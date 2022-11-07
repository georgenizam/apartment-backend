import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAdTypeDto } from './dto/create-ad-type.dto';
import { CreateApartmentsTypeDto } from './dto/create-apartments-type.dto';
import { CreateBedroomsDto } from './dto/create-bedrooms.dto';
import { CreateBathroomsDto } from './dto/create-bathrooms.dto';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { CreateElevatorDto } from './dto/create-elevator.dto';
import { AdOptionsService } from './ad-options.service';

@Controller('ad-options')
export class AdOptionsController {
    constructor(private adOptions: AdOptionsService) {}
    @Get('ad-type')
    async getAllAdType() {
        return this.adOptions.getAllAdType();
    }
    @Post('ad-type')
    @UsePipes(new ValidationPipe())
    async addAdType(@Body() createAdTypeDto: CreateAdTypeDto) {
        return this.adOptions.createAdType(createAdTypeDto);
    }

    @Get('apartments-type')
    async getAllApartmentsType() {
        return this.adOptions.getAllApartmentsType();
    }
    @Post('apartments-type')
    @UsePipes(new ValidationPipe())
    async addApartmentsType(@Body() createApartmentsTypeDto: CreateApartmentsTypeDto) {
        return this.adOptions.createApartmentsType(createApartmentsTypeDto);
    }

    @Get('bedrooms')
    async getAllBedrooms() {
        return this.adOptions.getAllBedrooms();
    }
    @Post('bedrooms')
    @UsePipes(new ValidationPipe())
    async addBedrooms(@Body() createBedroomsDto: CreateBedroomsDto) {
        return this.adOptions.createBedrooms(createBedroomsDto);
    }

    @Get('bathrooms')
    async getAllBathrooms() {
        return this.adOptions.getAllBathrooms();
    }
    @Post('bathrooms')
    @UsePipes(new ValidationPipe())
    async addBathrooms(@Body() createBathroomsDto: CreateBathroomsDto) {
        return this.adOptions.createBathrooms(createBathroomsDto);
    }

    @Get('facilities')
    async getAllFacilities() {
        return this.adOptions.getAllFacilities();
    }
    @Post('facilities')
    @UsePipes(new ValidationPipe())
    async add(@Body() createFacilitiesDto: CreateFacilitiesDto) {
        return this.adOptions.createFacilities(createFacilitiesDto);
    }

    @Get('elevator')
    async getAllElevator() {
        return this.adOptions.getAllElevator();
    }
    @Post('elevator')
    @UsePipes(new ValidationPipe())
    async addElevator(@Body() createElevatorDto: CreateElevatorDto) {
        return this.adOptions.createElevator(createElevatorDto);
    }
}
