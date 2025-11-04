import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DecoratorsService } from './decorators.service';
import { CreateDecoratorDto } from './dto/create-decorator.dto';
import { UpdateDecoratorDto } from './dto/update-decorator.dto';

@Controller('decorators')
export class DecoratorsController {
  constructor(private readonly decoratorsService: DecoratorsService) {}

  @Post()
  create(@Body() createDecoratorDto: CreateDecoratorDto) {
    return this.decoratorsService.create(createDecoratorDto);
  }

  @Get()
  findAll() {
    return this.decoratorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decoratorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDecoratorDto: UpdateDecoratorDto) {
    return this.decoratorsService.update(+id, updateDecoratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decoratorsService.remove(+id);
  }
}
