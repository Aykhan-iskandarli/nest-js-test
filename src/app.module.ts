import { Module } from '@nestjs/common';
import { User } from './user/user.model';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 4000,
      username: 'postgres',
      password: 'fener',
      database: 'test',
      models: [User, Roles, UserRoles],
      autoLoadModels: true,
    }),
    UserModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
