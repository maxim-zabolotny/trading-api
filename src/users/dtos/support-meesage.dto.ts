import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SupportRequestDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  theme: string;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  priority: string;
}