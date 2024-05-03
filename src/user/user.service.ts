import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dto/createUserDto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(createUserDto);
      const role = await this.roleService.getRoleByValue('USER');
      await user.$set('roles', [role.id]);
      user.roles = [role]; 
      return user;
    } catch (error) {
      console.log(error, 'sasa');
    }
  }

  async findAll(): Promise<Array<User>> {
    const users = await this.userModel.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
}
