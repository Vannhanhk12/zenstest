import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Nhanmysql1899!',
      database: 'zenstest',
      entities: [join(__dirname, '**', '*.entities.{js,ts}')],
      synchronize: true,
    }),
    JokesModule,
  ],
})
export class AppModule {}
