import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost): unknown {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(400).json({
      statusCode: 400,
      createdBy: 'ValidationErrorFilter',
      errors: exception.errmsg,
    });
  }
}