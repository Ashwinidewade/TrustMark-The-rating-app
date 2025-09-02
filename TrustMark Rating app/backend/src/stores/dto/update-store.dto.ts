import { IsOptional, IsEmail, MaxLength, IsNumber } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MaxLength(400)
  address?: string;

  @IsOptional()
  @IsNumber()
  ownerId?: number;
}
