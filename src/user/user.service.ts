import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserDTO, UserRO } from 'src/user/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ) { }
    
    async getAll(): Promise<UserRO[]> {
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject(false));
    }
    
    async login(data: UserDTO): Promise<UserRO> {
        let user = await this.userRepository.findOne({ where: { username: data.username } });
        if (!user || !(await user.comparePassword(data.password))) {
            throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
        }
        return user.toResponseObject();
    }
    
    async register(data: UserDTO): Promise<UserRO> {
        console.log('data :', data);
        let user = await this.userRepository.findOne({ where: { username: data.username } });
        if (user) {
            throw new HttpException('User already exist!', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }
}
