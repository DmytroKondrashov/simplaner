import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class PublisherService {
  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async produce(record: any, topic: string) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(record) }],
    });
  }
}
