import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailSubscriberError } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberError.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberError.FirstNameEmpty })
  public name: string;
}
