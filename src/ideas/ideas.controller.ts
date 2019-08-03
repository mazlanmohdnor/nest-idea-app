import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { IdeaDTO } from './dto/Idea.dto';
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
    createIdea(@Body() data: IdeaDTO) {
        this.logger.log(JSON.stringify(data));
        return this.ideaService.createIdea(data);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
        this.logger.log(JSON.stringify(data));
        return this.ideaService.updateIdea(id, data);
    }

    @Delete(':id')
    deleteIdea(@Param('id') id: string) {
        return this.ideaService.deleteIdea(id);
    }
}
