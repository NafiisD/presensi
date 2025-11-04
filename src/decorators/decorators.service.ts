import { Injectable } from '@nestjs/common';
import { CreateDecoratorDto } from './dto/create-decorator.dto';
import { UpdateDecoratorDto } from './dto/update-decorator.dto';

@Injectable()
export class DecoratorsService {
  create(createDecoratorDto: CreateDecoratorDto) {
    return 'This action adds a new decorator';
  }

  findAll() {
    return `This action returns all decorators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} decorator`;
  }

  update(id: number, updateDecoratorDto: UpdateDecoratorDto) {
    return `This action updates a #${id} decorator`;
  }

  remove(id: number) {
    return `This action removes a #${id} decorator`;
  }
}
