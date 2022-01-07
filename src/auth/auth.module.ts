
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'my_secret',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  providers: [LocalStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
