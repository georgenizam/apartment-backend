import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdOptionsService } from './ad-options.service';
import { CreateAdTypeDto } from './dto/create-ad-type.dto';
import { CreateApartmentsTypeDto } from './dto/create-apartments-type.dto';
import { CreateBathroomsDto } from './dto/create-bathrooms.dto';
import { CreateBedroomsDto } from './dto/create-bedrooms.dto';
import { CreateElevatorDto } from './dto/create-elevator.dto';
import { CreateFacilitiesDto } from './dto/create-facilities.dto';
import { AdType } from './schemas/ad-type.schema';
import { ApartmentsType } from './schemas/apartments-type.schema';
import { Bathrooms } from './schemas/bathrooms.schema';
import { Bedrooms } from './schemas/bedrooms.schema';
import { Elevator } from './schemas/elevator.schema';
import { Facilities } from './schemas/facilities.schema';

@ApiTags('Ad options')
@Controller('ad-options')
export class AdOptionsController {
    constructor(private adOptions: AdOptionsService) {}

    @ApiOperation({ summary: 'Get ad-type' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [AdType] })
    @Get('ad-type')
    async getAllAdType() {
        return this.adOptions.getAllAdType();
    }

    @ApiOperation({ summary: 'Create ad-type' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: AdType })
    @Post('ad-type')
    @UsePipes(new ValidationPipe())
    async addAdType(@Body() createAdTypeDto: CreateAdTypeDto) {
        return this.adOptions.createAdType(createAdTypeDto);
    }

    @ApiOperation({ summary: 'Get apartments-type' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [ApartmentsType] })
    @Get('apartments-type')
    async getAllApartmentsType() {
        return this.adOptions.getAllApartmentsType();
    }

    @ApiOperation({ summary: 'Create apartments-type' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: ApartmentsType })
    @Post('apartments-type')
    @UsePipes(new ValidationPipe())
    async addApartmentsType(@Body() createApartmentsTypeDto: CreateApartmentsTypeDto) {
        return this.adOptions.createApartmentsType(createApartmentsTypeDto);
    }

    @ApiOperation({ summary: 'Get bedrooms' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Bedrooms] })
    @Get('bedrooms')
    async getAllBedrooms() {
        return this.adOptions.getAllBedrooms();
    }

    @ApiOperation({ summary: 'Create bedrooms' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: Bedrooms })
    @Post('bedrooms')
    @UsePipes(new ValidationPipe())
    async addBedrooms(@Body() createBedroomsDto: CreateBedroomsDto) {
        return this.adOptions.createBedrooms(createBedroomsDto);
    }

    @ApiOperation({ summary: 'Get bathrooms' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Bathrooms] })
    @Get('bathrooms')
    async getAllBathrooms() {
        return this.adOptions.getAllBathrooms();
    }

    @ApiOperation({ summary: 'Create bathrooms' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: Bathrooms })
    @Post('bathrooms')
    @UsePipes(new ValidationPipe())
    async addBathrooms(@Body() createBathroomsDto: CreateBathroomsDto) {
        return this.adOptions.createBathrooms(createBathroomsDto);
    }

    @ApiOperation({ summary: 'Get facilities' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Facilities] })
    @Get('facilities')
    async getAllFacilities() {
        return this.adOptions.getAllFacilities();
    }

    @ApiOperation({ summary: 'Create facilities' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: Facilities })
    @Post('facilities')
    @UsePipes(new ValidationPipe())
    async add(@Body() createFacilitiesDto: CreateFacilitiesDto) {
        return this.adOptions.createFacilities(createFacilitiesDto);
    }

    @ApiOperation({ summary: 'Get elevator' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [Elevator] })
    @Get('elevator')
    async getAllElevator() {
        return this.adOptions.getAllElevator();
    }

    @ApiOperation({ summary: 'Create elevator' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: Elevator })
    @Post('elevator')
    @UsePipes(new ValidationPipe())
    async addElevator(@Body() createElevatorDto: CreateElevatorDto) {
        return this.adOptions.createElevator(createElevatorDto);
    }
}
