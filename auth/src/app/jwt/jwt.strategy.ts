import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/service/auth.service';
import { jwtConstants } from '../constants/constants';
import { JwtPayload } from '../interfaces/jwt/jwt-payload.interface';
import { Credential } from '../dto/credential.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(credential: Credential): Promise<JwtPayload> {
    const user = await this.authService.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
