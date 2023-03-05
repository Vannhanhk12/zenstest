import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJokeDto {
  @ApiProperty({ description: 'Title of the joke', example: 'Title 1' })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({ description: 'Content of the joke', example: 'Content 1' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'Author of the joke', example: 'NhanJR' })
  @IsString()
  @IsOptional()
  author: string;
}
