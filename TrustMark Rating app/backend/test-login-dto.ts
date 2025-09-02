import { IsEmail, IsNotEmpty } from "class-validator";

export class TestLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
