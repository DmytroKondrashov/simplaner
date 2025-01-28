import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [data] = context.getArgs();
    const token = data?.token;

    if (!token) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new RpcException({
        statusCode: 403,
        message: 'Invalid or expired token',
      });
    }
  }
}
