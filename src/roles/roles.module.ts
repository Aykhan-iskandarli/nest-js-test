import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './roles.model';
import { User } from 'src/user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from './user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Roles, UserRoles])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
