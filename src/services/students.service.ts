import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Student } from '../entities/student.entity';
import { StudentSubject } from '../entities/student-subject.entity';
import { Subject } from '../entities/subject.entity';
import { CreateStudentDto } from '../dtos/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(StudentSubject)
    private readonly studentSubjectRepository: Repository<StudentSubject>,
  ) {}

  //* Function to create new Student
  async create(createStudentDto: CreateStudentDto) {
    try {
      const newStudent = this.studentRepository.create(createStudentDto);
      await this.studentRepository.save(newStudent);
      return;
    } catch (error) {
      throw new HttpException(
        `Error creating: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //* Function to assign Subject while creating Student
  async createStudentWithSubject(dto: CreateStudentDto) {
    const { studentName, subjectIds } = dto;

    const subjects = await this.subjectRepository.find({
      where: {
        id: In(subjectIds),
      },
    });

    if (subjects.length !== subjectIds.length) {
      throw new NotFoundException('One or more subjects not found');
    }
    const newStudent = this.studentRepository.create({
      studentName,
      subjects,
    });
    return await this.studentRepository.save(newStudent);
  }

  //* Function to add relationship between two tables
  async assignSubjectToStudent(
    studentId: number,
    subjectId: number,
  ): Promise<void> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['subjects'],
    });

    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    } else if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    // Avoid duplicates
    const alreadyAssigned = student.subjects?.some((s) => s.id === subjectId);
    if (alreadyAssigned) {
      return;
    }

    student.subjects = [...(student.subjects || []), subject];
    await this.studentRepository.save(student);
  }

  //* Function to display all - only the student details
  async findStudent() {
    try {
      return await this.studentRepository
        .createQueryBuilder('student')
        .orderBy('student.studentName', 'ASC')
        .getMany();
    } catch (error) {
      throw new HttpException(
        `Error finding : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //* Function to display all - Student and their Subjects
  async findAll() {
    try {
      return await this.studentRepository
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.subjects', 'subject')
        .orderBy('student.studentName', 'ASC')
        .getMany();
    } catch (error) {
      throw new HttpException(
        `Error finding : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //* Function to display only single Student by id and their Subject
  async findOne(id: number) {
    try {
      return await this.studentRepository
        .createQueryBuilder('student')
        .where({ id })
        .leftJoinAndSelect('student.subjects', 'subject')
        .getOneOrFail();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  //* Function to update Student
  //! Left to do
  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  //* Function to delete Student
  async remove(id: number) {
    try {
      const deleteStudent = await this.studentRepository
        .createQueryBuilder()
        .delete()
        .from(Student)
        .where('id = :id', { id })
        .execute();

      if (!deleteStudent) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      await this.studentRepository.delete(id);
      return {
        message: 'deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error deleting: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
