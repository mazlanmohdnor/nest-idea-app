import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
    private static toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    
    private static formatErrors(errors: ValidationError[]) {
        return errors.map(error => {
            for (let property in error.constraints) {
                return error.constraints[property];
            }
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
        const errors: ValidationError[] = await validate(object);
        if (errors.length > 0) {
            throw new HttpException(`Validation failed: ${ ValidationPipe.formatErrors(errors) } `, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    
}
