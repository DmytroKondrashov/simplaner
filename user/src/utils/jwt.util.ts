import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
  constructor(private readonly jwtService: JwtService) {}

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: 'df;kb;lvjeorpjriuvriohvnroiurgsavvdv',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
