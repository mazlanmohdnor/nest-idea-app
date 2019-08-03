import { IsString } from 'class-validator';

export class IdeaModel {
    @IsString()
    idea: string;
    
    @IsString()
    description: string;
}
