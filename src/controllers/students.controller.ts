import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { CreateStudentSubjectDto } from '../dtos/create-student-subject.dto';

@Controller('/student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  //* Create New Student
  @Post('/create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  //* Create New Student and assign Subject
  @Post('/create-assign')
  async createStudent(@Body() dto: CreateStudentDto) {
    return this.studentsService.createStudentWithSubject(dto);
  }

  //* Assign Subject to Student
  @Post('/assign')
  async JoinStudentSubject(@Body() dto: CreateStudentSubjectDto) {
    await this.studentsService.assignSubjectToStudent(
      dto.studentId,
      dto.subjectId,
    );
  }

  //* Get Student Details only
  @Get('/')
  findStudent() {
    return this.studentsService.findStudent();
  }

  //* Get all details of Student - Subject Details as well
  @Get('/all')
  findAll() {
    return this.studentsService.findAll();
  }

  //* Get Student by id
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  //* Update student detail
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  //* Delete Student
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
