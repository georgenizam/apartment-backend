import { CreateAdTypeDto } from '../dto/create-ad-type.dto';
import { CreateApartmentsTypeDto } from '../dto/create-apartments-type.dto';
import { CreateBathroomsDto } from '../dto/create-bathrooms.dto';
import { CreateBedroomsDto } from '../dto/create-bedrooms.dto';
import { CreateElevatorDto } from '../dto/create-elevator.dto';
import { CreateFacilitiesDto } from '../dto/create-facilities.dto';

export const adTypes: CreateAdTypeDto[] = [
    {
        label: 'Buy',
        value: 'buy',
    },
    {
        label: 'Rent',
        value: 'rent',
    },
];
export const apartmentsTypes: CreateApartmentsTypeDto[] = [
    {
        label: 'Apartment',
        value: 'apartment',
    },
    {
        label: 'House',
        value: 'house',
    },
];
export const bathrooms: CreateBathroomsDto[] = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '3',
        value: '3',
    },
    {
        label: '4',
        value: '4',
    },
    {
        label: '5+',
        value: '5+',
    },
];
export const bedrooms: CreateBedroomsDto[] = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '3',
        value: '3',
    },
    {
        label: '4',
        value: '4',
    },
    {
        label: '5+',
        value: '5+',
    },
];
export const elevators: CreateElevatorDto[] = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '3',
        value: '3',
    },
    {
        label: '4',
        value: '4',
    },
    {
        label: 'no',
        value: 'no',
    },
];
export const facilities: CreateFacilitiesDto[] = [
    {
        label: 'TV',
        value: 'tv',
    },
    {
        label: 'WI-FI',
        value: 'wi-fi',
    },
    {
        label: 'Pool',
        value: 'pool',
    },
];
