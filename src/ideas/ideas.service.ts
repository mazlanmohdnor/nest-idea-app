import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdeaDTO } from './dto/Idea.dto';
import { IdeaEntity } from './ideas.entity';

@Injectable()
export class IdeasService {
    
    constructor(
        @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>
    ) { }
    
    async getAllIdeas() {
        return await this.ideaRepository.find();
    }
    
    async getSingleIdea(id: string) {
        console.log('getSingleIdea:', id);
        const idea = await this.ideaRepository.findOne({ where: id });
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }
    
    async createIdea(data: IdeaDTO) {
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }
    
    async updateIdea(id: string, data: Partial<IdeaDTO>) {
        let idea = await this.ideaRepository.findOne({ where: id });
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        
        await this.ideaRepository.update({ id }, data);
        idea = await this.ideaRepository.findOne({ where: id });
    
        return idea;
    }
    
    async deleteIdea(id: string) {
        const idea = await this.ideaRepository.findOne({ where: id });
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.ideaRepository.delete({ id });
        return idea;
    }
}
