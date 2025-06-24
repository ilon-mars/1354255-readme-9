import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { getRabbitMQOptions } from '@project/shared/helpers';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('rabbit'))],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
