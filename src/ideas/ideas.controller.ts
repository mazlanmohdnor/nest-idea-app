import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UsePipes } from '@nestjs/common';
import { IdeaModel } from 'src/ideas/model/Idea.model';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { IdeasService } from './ideas.service';

@Controller('api/idea')
export class IdeasController {
    
    private logger = new Logger('IdeasController');
    constructor(
        private ideaService: IdeasService
    ) { }

    @Get()
    getAllIdeas() {
        return this.ideaService.getAllIdeas();
    }

    @Get(':id')
    getSingleIdea(@Param() id: string) {
        return this.ideaService.getSingleIdea(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createIdea(@Body() data: IdeaModel) {
        this.logger.log(JSON.stringify(data));
        return this.ideaService.createIdea(data);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id: string, @Body() data: IdeaModel) {
        this.logger.log(JSON.stringify(data));
        return this.ideaService.updateIdea(id, data);
    }

    @Delete(':id')
    deleteIdea(@Param('id') id: string) {
        return this.ideaService.deleteIdea(id);
    }
}
