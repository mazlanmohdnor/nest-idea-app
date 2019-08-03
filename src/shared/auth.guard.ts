import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    static async validateToken(token: string) {
        
        try {
            return jwt.verify(token, process.env.SECRET);
        } catch (err) {
            const message = 'Token error:' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: any = context.switchToHttp().getRequest();
        
        if (!request.headers.authorization) {
            return false;
        }
        
        request.user = await AuthGuard.validateToken(request.headers.authorization);
        return true;
    }
}
