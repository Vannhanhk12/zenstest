import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Joke } from 'src/entities/joke.entity';
import { Repository } from 'typeorm';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke) private jokeRepository: Repository<Joke>,
  ) {}
  create(createJokeDto: CreateJokeDto) {
    return this.jokeRepository.save(createJokeDto);
  }

  findAll() {
    return this.jokeRepository.find();
  }

  findOne(id: number) {
    return this.jokeRepository.findOneBy({ id });
  }

  async update(id: number, updateJokeDto: UpdateJokeDto) {
    return await this.jokeRepository.update({ id }, { ...updateJokeDto });
  }

  async remove(id: number) {
    return await this.jokeRepository.delete({ id });
  }
}
