import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];

  create(userData: any) {
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name,
      username: userData.username,
      password: bcrypt.hashSync(userData.password, 10),
      role: userData.role,
    };
    this.users.push(newUser);

    const { password, ...result } = newUser;
    return {
      status: 'success',
      message: 'Pengguna berhasil ditambahkan',
      data: result,
    };
  }

  update(id: number, updateData: any) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return { message: 'Pengguna tidak ditemukan' };
    }

    const existingUser = this.users[userIndex];
    const updatedUser: User = {
      ...existingUser,
      ...updateData,
      password: updateData.password
        ? bcrypt.hashSync(updateData.password, 10)
        : existingUser.password,
    };

    this.users[userIndex] = updatedUser;

    const { password, ...result } = updatedUser;
    return {
      name: result.name,
      message: 'Pengguna berhasil diubah',
      data: result,
    };
  }

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      return { message: 'Pengguna tidak ditemukan' };
    }

    const { password, ...result } = user;
    return {
      status: 'success',
      data: result,
    };
  }

  remove(id: number) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return { message: 'Pengguna tidak ditemukan' };
    this.users.splice(index, 1);
    return { message: 'Pengguna berhasil dihapus' };
  }

  findByUsername(username: string) {
    return this.users.find((u) => u.username === username);
  }
}