import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Credential } from '../../dto/credential.dto';
import { Token } from 'src/app/jwt/jwt-response';
import { LocalAuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/')
  @HttpCode(200)
  public async auth(@Body() credential: Credential): Promise<Token> {
    return this.service.auth(credential);
  }
}
