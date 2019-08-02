import { Body, Controller, Get, Post } from '@nestjs/common';
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
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }
    
    @Post('register')
    register(@Body() data: UserDTO) {
        return this.userService.register(data);
    }
}
