/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class CreateUserDto {

  @ApiProperty({example:'123456', description:"User password"})
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString()
  readonly password: string;

  @ApiProperty({example:'Axiles@gmail.com', description:"User email address"})
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString()
  readonly email: string;
}
