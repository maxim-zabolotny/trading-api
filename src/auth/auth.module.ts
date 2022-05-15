import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
