import { Test, TestingModule } from '@nestjs/testing';
import { JokesService } from './jokes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Joke } from '../entities/joke.entity';
import { Repository } from 'typeorm';
import { CreateJokeDto } from './dto/create-joke.dto';
import { UpdateJokeDto } from './dto/update-joke.dto';

describe('JokesService', () => {
  let service: JokesService;
  let repository: Repository<Joke>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokesService,
        {
          provide: getRepositoryToken(Joke),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JokesService>(JokesService);
    repository = module.get<Repository<Joke>>(getRepositoryToken(Joke));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a joke and return it', async () => {
      const createJokeDto: CreateJokeDto = {
        title: 'Title',
        content: 'This is a joke',
        author: 'Nhan',
      };

      const joke = new Joke(createJokeDto);

      mockRepository.save.mockReturnValue(joke);

      const result = await service.create(createJokeDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createJokeDto);
      expect(result).toEqual(joke);
    });
  });

  describe('getRandomJoke', () => {
    it('should return a random joke that has not been read', async () => {
      const arr = [
        { id: 1, content: 'Joke 1' },
        { id: 2, content: 'Joke 2' },
        { id: 3, content: 'Joke 3' },
      ];

      const session = {
        user: {
          jokes: [1, 2],
        },
      };

      mockRepository.find.mockReturnValue(arr);
      mockRepository.findOneBy.mockReturnValue(arr[2]);

      const result = await service.getRandomJoke(session);
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        id: 3,
      });
      expect(result).toEqual(arr[2]);
    });
  });

  describe('vote', () => {
    it('should increase the liked when like is true', async () => {
      const joke = { id: 1, liked: 1, disliked: 0 };
      const voteJokeDto = { id: 1, like: true };
      const session = { user: { id: 1, jokes: [] } };
      mockRepository.findOneBy.mockReturnValue(joke);

      const updatedJoke = { ...joke, liked: 1 };
      mockRepository.update.mockReturnValue(updatedJoke);

      const result = await service.vote(voteJokeDto, session);

      expect(result).toEqual(updatedJoke);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        { liked: 2 },
      );
    });

    it('should decrease the unliked when like is false', async () => {
      const joke = { id: 1, liked: 1, disliked: 0 };
      const voteJokeDto = { id: 1, like: false };
      const session = { user: { id: 1, jokes: [] } };
      mockRepository.findOneBy.mockReturnValue(joke);

      const updatedJoke = { ...joke, disliked: -1 };
      mockRepository.update.mockReturnValue(updatedJoke);

      const result = await service.vote(voteJokeDto, session);

      // expect(result).toEqual(await service.getRandomJoke(session));
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.update).toHaveBeenCalledWith(
        { id: 1 },
        { disliked: -1 },
      );
    });
  });
});
