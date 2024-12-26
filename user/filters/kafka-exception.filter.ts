import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export default class KafkaExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToRpc();
    const data = ctx.getData();
    const channel = ctx.getContext();

    let response: any;

    if (exception instanceof BadRequestException) {
      response = {
        status: 'error',
        message: exception.message,
      };
    } else {
      response = {
        status: 'error',
        message: 'Internal server error',
      };
    }

    channel.error(new RpcException(response), data);
  }
}
