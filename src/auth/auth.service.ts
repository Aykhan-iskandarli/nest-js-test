import {
  Body,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(@Body() userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(@Body() userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('already taken email address', 400);
    }
    const hashpassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashpassword,
    });
    return this.generateToken(user);
  }
  
  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: `Invalid` });
  }
}
