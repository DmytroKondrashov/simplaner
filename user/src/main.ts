import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
