import { PartialType } from '@nestjs/mapped-types';
import { CreateDecoratorDto } from './create-decorator.dto';

export class UpdateDecoratorDto extends PartialType(CreateDecoratorDto) {}
