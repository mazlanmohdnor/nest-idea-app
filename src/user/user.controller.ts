import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from 'src/user/model/user.model';
import { User } from 'src/user/user.decorator';
import { UserService } from 'src/user/user.service';

@Controller()
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    
    @Get('/api/users')
    @UseGuards(AuthGuard)
    getAllUser(@User() user) {
        console.log('user data from decorator :', user);
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
