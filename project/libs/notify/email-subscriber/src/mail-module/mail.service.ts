import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { NotifyConfig } from '@project/notify-config';
import { Post, Subscriber } from '@project/shared/core';
import { EmailSubscriberMessage } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notificationsConfig: ConfigType<typeof NotifyConfig>;

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notificationsConfig.mail.from,
      to: subscriber.email,
      subject: EmailSubscriberMessage.AddSubscriberSubject,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyNewPosts(posts: Post[], subscriber: Subscriber) {
    if (posts?.length) {
      await this.mailerService.sendMail({
        from: this.notificationsConfig.mail.from,
        to: subscriber.email,
        subject: EmailSubscriberMessage.NewPostsNotification,
        template: './new-posts',
        context: {
          subscriber,
          posts,
        },
      });
    } else {
      await this.mailerService.sendMail({
        from: this.notificationsConfig.mail.from,
        to: subscriber.email,
        subject: EmailSubscriberMessage.NewPostsNotification,
        template: './no-new-posts',
        context: {
          subscriber,
        },
      });
    }
  }
}
