import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../constants/constants';
import { JwtStrategy } from '../../jwt/jwt.strategy';
import { LocalStrategy } from 'src/app/jwt/local.strategy';
import { publicKey, privateKey } from 'src/config/signature';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      publicKey: publicKey,
      privateKey: privateKey,
      signOptions: {
        expiresIn: '30m',
        algorithm: 'RS256',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
