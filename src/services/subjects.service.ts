import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubjectDto } from '../dtos/create-subject.dto';
import { UpdateSubjectDto } from '../dtos/update-subject.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { Subject } from '../entities/subject.entity';
import { StudentSubject } from '../entities/student-subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(StudentSubject)
    private readonly studentSubjectRepository: Repository<StudentSubject>,
  ) {}

  //* Function to create new Subject
  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const newSubject = this.subjectRepository.create(createSubjectDto);
      await this.subjectRepository.save(newSubject);
      return;
    } catch (error) {
      throw new HttpException(
        `Error creating: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //* Function to assign Subject while creating Student
  async createSubjectWithStudent(dto: CreateSubjectDto) {
    const { subjectName, studentIds } = dto;

    const students = await this.studentRepository.find({
      where: {
        id: In(studentIds),
      },
    });

    if (students.length !== studentIds.length) {
      throw new NotFoundException('One or more student not found');
    }
    const newSubject = this.subjectRepository.create({
      subjectName,
      students,
    });
    return await this.subjectRepository.save(newSubject);
  }

  //* Function to add relationship between two tables
  async assignStudentToSubject(
    studentId: number,
    subjectId: number,
  ): Promise<void> {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: ['students'],
    });

    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    } else if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Avoid duplicates
    const alreadyAssigned = subject.students?.some((s) => s.id === studentId);
    if (alreadyAssigned) {
      return;
    }

    subject.students = [...(subject.students || []), student];
    await this.subjectRepository.save(subject);
  }

  //* Function to display all - only the subject details
  async findSubject() {
    try {
      return await this.subjectRepository
        .createQueryBuilder('subject')
        .orderBy('subject.subjectName', 'ASC')
        .getMany();
    } catch (error) {
      throw new HttpException(
        `Error finding : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //* Function to display all - Subject and their students
  async findAll() {
    try {
      return await this.subjectRepository
        .createQueryBuilder('subject')
        .leftJoinAndSelect('subject.students', 'student')
        .orderBy('subject.subjectName', 'ASC')
        .getMany();
    } catch (error) {
      throw new HttpException(
        `Error finding : ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //* Function to display only single Subject by id and their Students
  async findOne(id: number) {
    try {
      return await this.subjectRepository
        .createQueryBuilder('subject')
        .where({ id })
        .leftJoinAndSelect('subject.students', 'student')
        .getOneOrFail();
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  //* Function to update Subject
  //! Left to do
  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  //* Function to delete Subject
  async remove(id: number) {
    try {
      const deleteStudent = await this.subjectRepository
        .createQueryBuilder()
        .delete()
        .from(Subject)
        .where('id = :id', { id })
        .execute();

      if (!deleteStudent) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      await this.subjectRepository.delete(id);
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
