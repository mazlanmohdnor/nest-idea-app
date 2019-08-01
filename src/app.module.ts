import { join } from 'path';
import { environment } from './../environments/environment';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasModule } from './ideas/ideas.module';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: environment.host,
  port: environment.port,
  username: environment.username,
  password: environment.password,
  database: environment.database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: environment.synchronize,
  logging: environment.logging
}

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    IdeasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
