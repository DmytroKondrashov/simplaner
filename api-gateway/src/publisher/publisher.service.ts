import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PublisherService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientKafka) {}

  async produce(record: any, topic: string) {
    this.client.emit(topic, record);
  }
}
