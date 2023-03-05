import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class VoteJokeDto {
  @ApiProperty({ description: 'Id of the joke', example: 1 })
  @IsNotEmpty()
  id: string | number;

  @ApiProperty({ description: 'Title of the joke', example: true })
  @IsBoolean()
  @IsNotEmpty()
  like: boolean;
}
