import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentSubjectDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ example: 1 })
  studentId: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 103 })
  subjectId: number;
}
