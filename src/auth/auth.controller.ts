import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, LoginUserDto, RegisterUserDto } from './dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  public async loginUser(@Body() dto: LoginUserDto): Promise<AuthResponse> {
    return await this.authService.loginUser(dto);
  }

  @ApiOperation({ summary: 'Registration user' })
  @Post('register')
  public async registerUser(
    @Body() dto: RegisterUserDto,
  ): Promise<boolean> {
    return !!await this.authService.registerUser(dto);
  }
}