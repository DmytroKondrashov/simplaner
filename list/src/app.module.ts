import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { List } from './entities/list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([List]),
    ClientsModule.register([
      {
        name: 'API_GATEWAY_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
