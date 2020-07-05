import { ApiProperty } from '@nestjs/swagger';
export class Credential {
  @ApiProperty({
    example: 'Gesuvs',
    description: 'Username',
  })
  username: string;
  @ApiProperty({
    example: '123',
    type: 'password',
    description: 'Password from user',
  })
  password: string;
  constructor(username: string, password: string) {
    (this.username = username), (this.password = password);
  }
}
