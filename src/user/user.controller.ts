import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './createUserDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }
}
