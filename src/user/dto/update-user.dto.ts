import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    name?: string;
    
    @IsString()
    username?: string;
    
    @IsString()
    password?: string;
    
    @IsString()
    role?: string; // contoh: siswa, karyawan, admin
}