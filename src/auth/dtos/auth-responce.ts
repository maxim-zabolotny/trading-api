import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users';

export class AuthResponse {
  @ApiProperty()
  token: string;
  @ApiProperty({ type: () => User })
  user: User;
}
