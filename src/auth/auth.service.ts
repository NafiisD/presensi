import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async login(username: string, password: string) {
    const user = this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'SECRET_KEY',
      { expiresIn: '1h' },
    );

    return {
      status: 'success',
      message: 'login berhasil',
      token,
    };
  }
}