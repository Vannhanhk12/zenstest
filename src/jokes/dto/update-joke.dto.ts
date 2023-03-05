import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateJokeDto } from './create-joke.dto';

export class UpdateJokeDto extends PartialType(CreateJokeDto) {
  @ApiProperty({ description: 'Title of the joke', example: 'Title 1' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Content of the joke', example: 'Content 1' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Author of the joke', example: 'Nhanpok' })
  @IsString()
  @IsOptional()
  author?: string;
}
