import { IsEmail, IsNotEmpty, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(60)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  password: string;

  @IsOptional()
  @MaxLength(400)
  address: string;
}
