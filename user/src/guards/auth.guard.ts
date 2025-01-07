import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [data] = context.getArgs();
    const token = data.token;
    if (!token) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
    try {
      console.log('==============');
      const decoded = this.jwtService.decode(token);
      console.log('Decoded Token:', decoded);
      console.log('==============');
      const payload = await this.jwtService.verify(token);
      console.log('==============');
      console.log(payload);
      console.log('==============');
      return true;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error,
      });
    }
  }
}
