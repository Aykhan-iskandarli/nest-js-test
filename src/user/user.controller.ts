import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { Jwtguard } from 'src/auth/jwt-auth.guard';

@ApiTags('User create')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(Jwtguard)
  @Get('findAll')
  getAllUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, type: User })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }
}
