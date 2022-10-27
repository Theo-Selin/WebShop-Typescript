import { SetMetadata, Type } from '@nestjs/common';

export const RESPONSE_DTO_KEY = 'responseDto';
export const ResponseDto = (responseDto: Type) =>
  SetMetadata(RESPONSE_DTO_KEY, responseDto);
