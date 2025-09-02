import { IsNotEmpty, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  comment: string;
}
