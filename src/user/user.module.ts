import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { Roles } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Roles, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],

  exports: [UserService],
})
export class UserModule {}
