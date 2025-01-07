import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  authenticateUser(payload: any) {
    const { email, id } = payload;
    console.log('==============');
    console.log(email, id);
    console.log('==============');
    return this.jwtService.sign({ email, id });
  }
}
