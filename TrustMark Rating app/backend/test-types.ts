import { IsEmail, IsNotEmpty } from "class-validator";

class TestDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

console.log("Class validator types are working!");
