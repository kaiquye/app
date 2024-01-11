import { APIResponse } from '@app/shared/adapters/api-response.adapter';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(BadRequestException)
export class BadRequestErrorFilter implements ExceptionFilter {
  constructor(private httpAdapter: HttpAdapterHost) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapter;

    const ctx = host.switchToHttp();

    console.log(new Date().toISOString(), exception);

    const error = exception.getResponse();
    const message = error['message'] ?? exception.message;

    const responseBody: APIResponse<unknown> = {
      error: {
        message: message,
        flag: 'bad.request',
      },
      status: 400,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.BAD_REQUEST);
  }
}
