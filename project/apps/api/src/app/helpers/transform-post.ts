import { HttpService } from '@nestjs/axios';
import { Post, PostType } from '@project/shared/core';
import { fillAuthorInfo } from './fill-author-info';
import { substituteFileUrl } from './substitute-file-url';

export async function transformPost(httpService: HttpService, record: Post) {
  await fillAuthorInfo(httpService, record);
  if (record?.type === PostType.Photo) {
    record.content['pictureUrl'] = await substituteFileUrl(
      httpService,
      record.content['pictureId'],
    );
  }
}
