import { Test, TestingModule } from '@nestjs/testing';
import { KafkapublisherService } from './kafkapublisher.service';

describe('KafkapublisherService', () => {
  let service: KafkapublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkapublisherService],
    }).compile();

    service = module.get<KafkapublisherService>(KafkapublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
