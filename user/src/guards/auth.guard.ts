import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
    return user;
  }
}
