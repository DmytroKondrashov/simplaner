import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserAlreadyExistsException } from 'src/exceptions/user-already-exists.exception';

@Injectable()
export default class UserUniquenessGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email } = request;
    if (!email || typeof email !== 'string') {
      throw new UserAlreadyExistsException();
    }
    const existingUser = await this.userService.findOne({
      id: undefined,
      email,
    });
    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }
    return true;
  }
}
