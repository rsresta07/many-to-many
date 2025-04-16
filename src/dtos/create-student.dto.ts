import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @ApiProperty({ example: 'Kumari' })
  studentName: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @ApiProperty({ example: [1, 2], description: 'Array of subject IDs' })
  subjectIds: number[];
}
