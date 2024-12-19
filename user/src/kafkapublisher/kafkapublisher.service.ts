import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkapublisherService implements OnModuleInit, OnModuleDestroy {
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
    console.log('==============');
    console.log('User-service is producing...', {
      record: JSON.stringify(record),
      topic,
    });
    console.log('==============');
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(record) }],
    });
  }
}
