import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Session } from 'express-session';
import { Joke } from 'src/entities/joke.entity';
import { Repository } from 'typeorm';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { VoteJokeDto } from './dto/vote-joke.dto';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke) private jokeRepository: Repository<Joke>,
  ) {}
  create(createJokeDto: CreateJokeDto) {
    return this.jokeRepository.save(createJokeDto);
  }

  // async findAll() {
  //   return this.jokeRepository.find();
  // }

  async getRandomJoke(session: Record<string, any>) {
    const arr = await this.jokeRepository.find();
    const jokesId = [];
    arr.forEach((joke) => jokesId.push(joke.id));
    const jokesReaded = session.user.jokes;

    if (jokesId.length === session.user.jokes.length) {
      return "That's all the jokes for today! Come back another day!";
    }

    const jokesUnreaded = jokesId.filter((e) => !jokesReaded.includes(e));
    const randomElement =
      jokesUnreaded[Math.floor(Math.random() * jokesUnreaded.length)];
    session.user.jokes.push(randomElement);

    return this.jokeRepository.findOneBy({ id: randomElement });
  }

  async vote(voteJokeDto: VoteJokeDto, session: Record<string, any>) {
    const { id, like } = voteJokeDto;
    if (like) {
      const countLike = (await this.jokeRepository.findOneBy({ id })).liked + 1;
      await this.jokeRepository.update({ id }, { liked: countLike });
      return await this.getRandomJoke(session);
    }
    const countUnlike = (await this.jokeRepository.findOneBy({ id })).liked - 1;
    await this.jokeRepository.update({ id }, { disliked: countUnlike });
    return this.getRandomJoke(session);
  }

  async update(id: number, updateJokeDto: UpdateJokeDto) {
    return await this.jokeRepository.update({ id }, { ...updateJokeDto });
  }

  async remove(id: number) {
    return await this.jokeRepository.delete({ id });
  }
}
