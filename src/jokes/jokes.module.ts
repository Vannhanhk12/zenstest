import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';

@Module({
  controllers: [JokesController],
  providers: [JokesService]
})
export class JokesModule {}
