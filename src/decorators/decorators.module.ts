import { Module } from '@nestjs/common';
import { DecoratorsService } from './decorators.service';
import { DecoratorsController } from './decorators.controller';

@Module({
  controllers: [DecoratorsController],
  providers: [DecoratorsService],
})
export class DecoratorsModule {}
