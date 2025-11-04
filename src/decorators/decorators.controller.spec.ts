import { Test, TestingModule } from '@nestjs/testing';
import { DecoratorsController } from './decorators.controller';
import { DecoratorsService } from './decorators.service';

describe('DecoratorsController', () => {
  let controller: DecoratorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecoratorsController],
      providers: [DecoratorsService],
    }).compile();

    controller = module.get<DecoratorsController>(DecoratorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
