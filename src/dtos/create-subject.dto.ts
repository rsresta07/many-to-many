import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @IsString()
  @ApiProperty({ example: 'DOTNET' })
  subjectName: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @ApiProperty({ example: [1, 2], description: 'Array of student IDs' })
  studentIds: number[];
}
