import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{7,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, no spaces, and be at least 7 characters long',
  })
  password: string;
}
