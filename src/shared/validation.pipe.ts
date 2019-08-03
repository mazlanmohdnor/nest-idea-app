import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
    private static toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    
    private static formatErrors(errors: any[]) {
        return errors.map(error => {
            error.constrains.forEach((element) => {
                return element;
            });
        }).join(', ');
    }
    
    private static isEmpty(value: any) {
        return Object.keys(value).length <= 0;
    }
    
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (value instanceof Object && ValidationPipe.isEmpty(value)) {
            throw new HttpException(`Validation failed: No body submitted`, HttpStatus.BAD_REQUEST);
        }
        
        if (!metatype || !ValidationPipe.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException(`Validation failed: ${ ValidationPipe.formatErrors(errors) } `, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    
}
