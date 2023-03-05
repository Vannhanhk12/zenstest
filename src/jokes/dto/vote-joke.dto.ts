import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VoteJokeDto {
  @IsNotEmpty()
  id: string | number;

  @IsBoolean()
  @IsNotEmpty()
  like: boolean;
}
