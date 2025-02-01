import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ListModule } from './list/list.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    UserModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-consumer',
          },
        },
      },
    ]),
    ListModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
