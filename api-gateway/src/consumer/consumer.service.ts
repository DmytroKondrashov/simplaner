import { Injectable } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService {
  private consumer: Consumer;

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'user-service',
      brokers: ['localhost:9092'],
    });

    this.consumer = kafka.consumer({ groupId: 'user-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: ['user.created.success', 'user.created.failed'],
      fromBeginning: false,
    });

    await this.consumer.run({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value?.toString();

        if (topic === 'user.created.success') {
          const data = JSON.parse(value);
          console.log(data);
        }

        if (topic === 'user.created.failed') {
          const data = JSON.parse(value);
          console.log(data);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
