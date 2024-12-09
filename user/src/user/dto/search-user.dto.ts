import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
