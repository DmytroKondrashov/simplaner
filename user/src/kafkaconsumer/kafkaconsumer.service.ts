import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class KafkaconsumerService implements OnModuleInit, OnModuleDestroy {
  private consumer: Consumer;

  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'user-service',
      brokers: ['localhost:9092'],
    });

    this.consumer = kafka.consumer({ groupId: 'user-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'user.created',
      fromBeginning: false,
    });

    await this.consumer.run({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value?.toString();

        if (topic === 'user.created') {
          const userData = JSON.parse(value);
          await this.userService.create(userData);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
