import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    User,
    JwtModule.register({
      global: true,
      secret: process.env.PRIVATE_KEY || 'Secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
