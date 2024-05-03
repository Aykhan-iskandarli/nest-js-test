import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY || 'Secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
