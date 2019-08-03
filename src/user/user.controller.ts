import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    
    @Get('/api/users')
    getAllUser() {
        return this.userService.getAll();
    }
    
    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }
    
    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO) {
        return this.userService.register(data);
    }
}
