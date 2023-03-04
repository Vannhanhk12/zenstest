import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { Joke } from 'src/entities/joke.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService],
  exports: [],
})
export class JokesModule {}
