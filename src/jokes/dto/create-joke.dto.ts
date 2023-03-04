import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJokeDto {
  @ApiProperty({ description: 'Title of the joke' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ description: 'Content of the joke' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Author of the joke', example: '' })
  @IsString()
  @IsOptional()
  author: string;
}
