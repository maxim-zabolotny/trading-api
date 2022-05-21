import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepositoryService } from './users.repository.service';
import { ICreateUser } from './interfaces';
import { User } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hashSync } from 'bcrypt';
import { ConfirmationToken } from './entities/confirmation-token.entity';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepositoryService: UsersRepositoryService,
    @InjectRepository(ConfirmationToken)
    private readonly confirmationTokenRepository: Repository<ConfirmationToken>,
  ) {
  }

  async findById(id: number): Promise<User> {
    return this.userRepositoryService.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepositoryService.findByEmail(email);
  }

  async createUser(body: ICreateUser): Promise<boolean> {
    return !!await this.userRepositoryService.create(body);
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.findById(userId);
    delete user.password;
    return user;
  }

  async changePassword(
    userId: number,
    body: ChangePasswordDto,
  ): Promise<any> {
    const user = await this.findById(userId);

    if (!user) throw new UnauthorizedException('');

    const currentPassword = await compare(
      String(body.currentPassword),
      user.password,
    );

    if (!currentPassword) {
      throw new BadRequestException('Incorect password');
    }

    body.newPassword = hashSync(body.newPassword, JSON.parse(process.env.SALT));

    await this.userRepositoryService.update(userId, {
      password: body.newPassword,
    });

    return new HttpException('', HttpStatus.OK);
  }

  async installPassword(body: ResetPasswordDto): Promise<User> {
    const { userId } = body;
    const code = await this.confirmationTokenRepository.findOne({
      where: { userId: userId },
    });
    if (!code) {
      throw new NotFoundException('The user has not sent a password request!');
    }
    const isTokenProper = code.token === body.token;

    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('The user has not sent a password request!');
    }

    body.newPassword = hashSync(body.newPassword, JSON.parse(process.env.SALT));

    if (!isTokenProper) {
      throw new BadRequestException('The code does not match!');
    }
    const newUser = user;
    newUser.password = body.newPassword;

    await Promise.all([
      this.confirmationTokenRepository.delete(code),
      this.userRepositoryService.create(newUser),
    ]);
    delete newUser.password;

    return newUser;
  }

  async sendMessageSupport(mail, file) {
    let options = {
      to: process.env.FROM_SUPPORT,
      from: `"${mail.email}" <${process.env.SMTP_BASE_FROM}>`,
      context: {
        message: mail.message,
      },
      subject: mail.theme,
      text: mail.message,
      template: 'support-message',
      attachments: undefined,
    };

    if (file) {
      options = {
        ...options,
        attachments: {
          filename: file.originalname,
          path: file.path,
          contentType: mail.mimeType,
        },
      };
    }
    // await this.mailService.sendSupportEmail(options);
  }

}
