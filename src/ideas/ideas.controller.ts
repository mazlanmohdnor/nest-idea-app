import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IdeaDTO } from './dto/Idea.dto';
import { IdeasService } from './ideas.service';

@Controller('api/idea')
export class IdeasController {

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
    createIdea(@Body() data: IdeaDTO) {
        return this.ideaService.createIdea(data);
    }

    @Put(':id')
    updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
        return this.ideaService.updateIdea(id, data);
    }


    @Delete(':id')
    deleteIdea(@Param('id') id: string) {
        return this.ideaService.deleteIdea(id);
    }
}
