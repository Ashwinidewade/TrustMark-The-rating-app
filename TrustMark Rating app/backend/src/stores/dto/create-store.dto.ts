import { IsEmail, IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(400)
  address: string;

  @IsOptional()
  @IsNumber()
  ownerId: number;
}
