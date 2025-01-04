import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  authenticateUser(payload: any) {
    const { email, id } = payload;
    return this.jwtService.sign({ email, id });
  }
}
