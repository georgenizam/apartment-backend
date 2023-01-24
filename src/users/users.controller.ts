import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Role } from 'src/auth/types/role.enum';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth('accessToken')
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [User] })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
    @UseGuards(RoleGuard([Role.Admin]))
    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiBearerAuth('accessToken')
    @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
    @UseGuards(RoleGuard([Role.Admin]))
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: User })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({ summary: 'Add role user' })
    @ApiBearerAuth('accessToken')
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Success', type: User })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
    @UseGuards(RoleGuard([Role.Admin]))
    @Post('/role')
    async addRole(@Body() addRoleDto: AddRoleDto) {
        return this.userService.addRole(addRoleDto);
    }
}
