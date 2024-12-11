import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
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

  async produce(record: ProducerRecord, topic: string) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify({ record }) }],
    });
  }
}
