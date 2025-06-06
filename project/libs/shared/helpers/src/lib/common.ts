import { $Enums, Prisma } from '@prisma/client';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';

import { BlogContents, PostT } from '@project/shared/core';

export type DateTimeUnit = 'h' | 's' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function postDocumentToPojo(
  document: {
    tags: {
      name: string;
    }[];
  } & {
    id: string;
    authorId: string;
    type: $Enums.Type;
    content: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    reposted: boolean;
    originalId: string | null;
    originalAuthorId: string | null;
  }
) {
  return {
    ...document,
    tags: document.tags.map(({ name }) => name),
    content:
      document.content as BlogContents[PostT],
  };
}

export function getRabbitMQConnectionString({
  user,
  password,
  host,
  port,
}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shmdy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}
