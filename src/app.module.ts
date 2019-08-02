import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from './../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasModule } from './ideas/ideas.module';
import { UserModule } from './user/user.module';

// nest g module users
// nest g service users
// nest g controller users
// nest g class users/user.entity

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
};

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    IdeasModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
