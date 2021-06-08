import { IsEmail, IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password: string;

  @IsNumber()
  leavesAllowed: number;
}
