import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaEntity } from 'src/ideas/entity/ideas.entity';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdeaEntity])
  ],
  providers: [IdeasService],
  controllers: [IdeasController]
})
export class IdeasModule { }
