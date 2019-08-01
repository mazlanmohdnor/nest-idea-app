import { IdeaEntity } from './ideas.entity';
import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdeaEntity])
  ],
  providers: [IdeasService],
  controllers: [IdeasController]
})
export class IdeasModule { }
