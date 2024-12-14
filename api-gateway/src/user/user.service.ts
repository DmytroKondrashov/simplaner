import { Injectable } from '@nestjs/common';
import { PublisherService } from 'src/publisher/publisher.service';

@Injectable()
export class UserService {
  constructor(private readonly publisherService: PublisherService) {}

  async produce(record: any, topic: string) {
    await this.publisherService.produce(record, topic);
  }
}
