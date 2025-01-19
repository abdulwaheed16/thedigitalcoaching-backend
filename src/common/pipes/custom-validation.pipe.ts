import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToClass(metadata.metatype, value);
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      const messages = this.formatErrors(errors);
      // const messages = errors;
      throw new BadRequestException({
        statusCode: 400,
        message: messages,
        timestamp: new Date().toISOString(),
        path: metadata.data,
      });
    }

    return value;
  }

  private formatErrors(errors: ValidationError[]): any {
    return errors.map((error) => {
      const constraints = {
        [error.property]: Object.values(error?.constraints || '').toString(),
      };
      return constraints;
    });
  }
}
