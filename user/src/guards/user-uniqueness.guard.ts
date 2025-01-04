import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export default class UserUniquenessGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request;
    if (!email || typeof email !== 'string') {
      throw new RpcException({
        statusCode: 400,
        message: 'Please provide an email string!',
      });
    }
    const existingUser = await this.userService.findOne({
      id: undefined,
      email,
    });
    if (existingUser === 'null') {
      return true;
    }
    if (existingUser) {
      throw new RpcException({
        statusCode: 400,
        message: 'A user with this email already exists',
      });
    }
    return true;
  }
}
