import { CreateUserDto } from '../dto/create-user.dto';

export const userAdmin: CreateUserDto = {
    username: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin-password',
    phone: '+7 999 999 99 99',
    avatarSrc: 'string avatar',
};

export const userDefault: CreateUserDto = {
    username: 'User default',
    email: 'user@gmail.com',
    password: 'user-password',
    phone: '+7 999 000 00 00',
    avatarSrc: 'string avatar',
};
