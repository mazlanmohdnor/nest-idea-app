import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaEntity } from 'src/ideas/entity/ideas.entity';
import { IdeaModel } from 'src/ideas/model/Idea.model';
import { Repository } from 'typeorm';

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
    
    async createIdea(data: IdeaModel) {
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }
    
    async updateIdea(id: string, data: Partial<IdeaModel>) {
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
