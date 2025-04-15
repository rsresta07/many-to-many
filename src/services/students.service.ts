import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { StudentSubject } from '../entities/student-subject.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(StudentSubject)
    private readonly studentSubjectRepository: Repository<StudentSubject>,
  ) {}

  async createStudentSubject(createStudentSubject: {
    studentId: number;
    subjectId: number;
  }): Promise<void> {
    const student = await this.studentRepository.findOne({
      where: { id: createStudentSubject.studentId },
    });
    if (!student) {
      throw new NotFoundException();
    }
    /* You can check if subject with given ID exists as well here in the same way with CourseRepository */

    await this.studentSubjectRepository.save(createStudentSubject);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
