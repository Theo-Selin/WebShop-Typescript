import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';
import * as operators from 'rxjs/operators';
import { RESPONSE_DTO_KEY } from './response-dto.decorator';

function MongooseClassSerializerInterceptor(serializerOptions: {
  defaultClass: Type;
}): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    serializerClass: Type;

    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }

      return plainToClass(this.serializerClass, document.toJSON());
    }

    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (Array.isArray(response)) {
        return response.map((res) => this.changePlainObjectToClass(res));
      }

      return this.changePlainObjectToClass(response);
    }

    intercept(context: ExecutionContext, next: CallHandler<any>) {
      const responseDto = this.reflector.get(
        RESPONSE_DTO_KEY,
        context.getHandler(),
      );

      if (responseDto) {
        this.serializerClass = responseDto;
      } else if (serializerOptions.defaultClass) {
        this.serializerClass = serializerOptions.defaultClass;
      } else {
        return next.handle();
      }

      const contextOptions = this.getContextOptions(context);
      const options = Object.assign(
        Object.assign({}, this.defaultOptions),
        contextOptions,
      );

      return next
        .handle()
        .pipe(operators.map((res) => this.serialize(res, options)));
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}

export default MongooseClassSerializerInterceptor;
