import { Test, TestingModule } from '@nestjs/testing';
import { KafkaconsumerService } from './kafkaconsumer.service';

describe('KafkaconsumerService', () => {
  let service: KafkaconsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaconsumerService],
    }).compile();

    service = module.get<KafkaconsumerService>(KafkaconsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
