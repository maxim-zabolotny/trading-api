import { Inject, Injectable } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    @Inject(MailerService)
    private mailerService: MailerService,
  ) {}

  public async sendSupportEmail(options: ISendMailOptions) {
    if (options.template)
      options.template = path.join(
        __dirname,
        '../../src/mail/templates',
        options.template + '.pug',
      );
    return new Promise((res, rej) => {
      this.mailerService
        .sendMail(options)
        .then(res)
        .catch((rej) => console.log(rej));
    });
  }

  public sendInvitationEmail(
    to: string,
    token: string,
  ): Promise<boolean> {
    const confirmationUrl = `${process.env.CONFIRMATION_LINK}?code=${token}`;
    return this.sendMailPromise({
      to,
      template: 'register-invite',
      subject: 'Подтверждение почты',
      text: 'Подтвердите вашу почту',
      context: {
        url: confirmationUrl,
        // frontUrl,
      },
    });
  }

  public sendPasswordInstallRequest(
    to: string,
    token: string,
    userId: number,
  ): Promise<boolean> {
    const requestUrl = `${process.env.REQUEST_LINK_RESET_PASSWORD}?code=${token}`;

    return this.sendMailPromise({
      to,
      template: 'install-password',
      subject: 'Сброс пароля',
      text: 'Перейдите по ссылке для сброса пароля',
      context: {
        requestUrl,
      },
    });
  }

  private sendMailPromise(options: ISendMailOptions): Promise<boolean> {
    if (options.template)
      options.template = path.join(
        __dirname,
        '../../src/mail/templates',
        options.template + '.pug',
      );

    options.from =
      `<${process.env.SMTP_BASE_FROM}>` || `<${process.env.FROM_SENDER}>`;

    return new Promise((res, rej) => {
      this.mailerService.sendMail(options).then(res).catch(rej);
    });
  }
}