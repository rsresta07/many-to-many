import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectsService } from '../services/subjects.service';
import { CreateSubjectDto } from '../dtos/create-subject.dto';
import { UpdateSubjectDto } from '../dtos/update-subject.dto';
import { CreateStudentSubjectDto } from '../dtos/create-student-subject.dto';

@Controller('/subject')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  //* Create New Student
  @Post('/create')
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  //* Create New Subject and assign Students
  @Post('/create-assign')
  async createSubject(@Body() dto: CreateSubjectDto) {
    return this.subjectsService.createSubjectWithStudent(dto);
  }

  //* Assign Subject to Student
  @Post('/assign')
  async JoinStudentSubject(@Body() dto: CreateStudentSubjectDto) {
    await this.subjectsService.assignStudentToSubject(
      dto.studentId,
      dto.subjectId,
    );
  }

  //* Get Student Details only
  @Get('/')
  findSubject() {
    return this.subjectsService.findSubject();
  }

  //* Get all details of Student - Subject Details as well
  @Get('/all')
  findAll() {
    return this.subjectsService.findAll();
  }

  //* Get Student by id
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  //* Update student detail
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  //* Delete Student
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
