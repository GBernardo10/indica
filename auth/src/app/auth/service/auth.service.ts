import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';
import { Credential } from '../../dto/credential.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../../dto/user.dto';
import { Token } from 'src/app/jwt/jwt-response';
import { privateKey } from 'src/config/signature';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(credential: Credential): Promise<UserDTO> {
    try {
      const user = await this.repository.findOneOrFail({
        where: {
          username: credential.username,
        },
      });

      if (user && user.password === credential.password) {
        const { password, ...result } = user;
        return result;
      }
    } catch (error) {
      throw new HttpException('NO_CONTENT', HttpStatus.NO_CONTENT);
    }
  }

  public async auth(credential: Credential): Promise<Token> {
    const payload = { username: credential.username };
    const response: Token = {
      token: this.jwtService.sign(payload),
    };
    return response;
  }
}
