import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/core';
import { rabbitConfig } from '@project/user-config';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish(this.rabbitOptions.exchange, RabbitRouting.AddSubscriber, {
      type: RabbitRouting.AddSubscriber,
      subscriber: dto,
    });
  }
}
