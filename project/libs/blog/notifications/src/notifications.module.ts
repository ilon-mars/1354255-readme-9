import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQOptions } from '@project/shared/helpers';
import { BlogNotificationsService } from './notifications.service';

@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit'))],
  providers: [BlogNotificationsService],
  exports: [BlogNotificationsService],
})
export class BlogNotificationsModule {}
