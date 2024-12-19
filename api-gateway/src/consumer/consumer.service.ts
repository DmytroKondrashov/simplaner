import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
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
      fromBeginning: true,
    });
    console.log('==============');
    console.log(
      'Api-gateway is subscribed to user.created.success, user.created.failed topics',
    );
    console.log('==============');

    await this.consumer.run({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value?.toString();

        console.log('==============');
        console.log('Api-gateway is consuming...', JSON.parse(value));
        console.log('==============');

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
