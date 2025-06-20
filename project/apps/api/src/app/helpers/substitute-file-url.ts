import { HttpService } from '@nestjs/axios';
import { File } from '@project/shared/core';
import { ApplicationServiceURL } from '../app.config';

export async function substituteFileUrl(httpService: HttpService, id: string) {
  try {
    const { data } = await httpService.axiosRef.get<File>(`${ApplicationServiceURL.Files}/${id}`);
    const subdirectory = data.subDirectory.replace('\\', '/');

    return `${ApplicationServiceURL.FilesStatic}/${subdirectory}/${data.hashName}`;
  } catch {
    console.log(`Failed to get information for file with id ${id}`);

    return id;
  }
}
