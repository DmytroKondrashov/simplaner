import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LIST_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'list',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'list-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
