import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './createUserDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUser: CreateUserDto): Promise<User> {
    const { name, surname, email } = createUser;
    const user = await this.userRepo.create({
      email,
      name,
      surname,
    });
    return this.userRepo.save(user);
  }

  findAll(): Promise<Array<User>> {
    return this.userRepo.find();
  }

  findOne(id: number | any): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async delete(id: number): Promise<string> {
    await this.userRepo.delete(id);
    return 'Deleted successfully';
  }
}
