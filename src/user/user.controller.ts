import { Controller, Post, Put, Get, Delete, Body, Param, ParseIntPipe, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Menambah pengguna
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // Mengubah data pengguna
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // Mengambil data pengguna berdasarkan ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // Menghapus pengguna
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}