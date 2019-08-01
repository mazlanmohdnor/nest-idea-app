import { IdeaEntity } from './ideas.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaDTO } from './dto/Idea.dto';

@Injectable()
export class IdeasService {

    constructor(
        @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>
    ) { }

    async getAllIdeas() {
        return await this.ideaRepository.find();
    }

    async getSingleIdea(id: string) {
        console.log('getSingleIdea:', id)
        return await this.ideaRepository.findOne({ where: id });
    }

    async createIdea(data: IdeaDTO) {
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }

    async updateIdea(id: string, data: Partial<IdeaDTO>) {
        await this.ideaRepository.update({ id }, data);
        return await this.ideaRepository.findOne({ id: id });
    }

    async deleteIdea(id: string) {
        await this.ideaRepository.delete({ id });
        return { deleted: true };
    }
}
