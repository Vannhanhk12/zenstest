import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { JokesService } from './jokes.service';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { Request, response } from 'express';
import { VoteJokeDto } from './dto/vote-joke.dto';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Post()
  create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokesService.create(createJokeDto);
  }

  // @Get('all')
  // findAll() {
  //   return this.jokesService.findAll();
  // }

  @Get()
  async findOne(
    @Param('id') id: string,
    @Req() request: Request,
    @Session() session: Record<string, any>,
  ) {
    if (!session.user) {
      session.user = { id: 1, jokes: [] };
      session.user.id = request.sessionID;
      session.user.jokes = [];
      return await this.jokesService.getRandomJoke(session);
    }
    if (request.sessionID)
      return await this.jokesService.getRandomJoke(session);
  }

  @Post('vote')
  async voteJoke(
    @Body() voteJokeDto: VoteJokeDto,
    @Req() request: Request,
    @Session() session: Record<string, any>,
  ) {
    if (!session.user) {
      session.user = { id: 1, jokes: [] };
      session.user.id = request.sessionID;
      session.user.jokes = [];
    }
    return await this.jokesService.vote(voteJokeDto, session);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJokeDto: UpdateJokeDto) {
    return this.jokesService.update(+id, updateJokeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jokesService.remove(+id);
  }
}
