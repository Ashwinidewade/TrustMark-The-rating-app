import { IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(20)
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(16)
  @Matches(/(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message: 'Password must contain at least one uppercase letter and one special character',
  })
  password?: string;

  @IsOptional()
  @MaxLength(400)
  address?: string;
}
