import { Module } from '@nestjs/common';
import { StudentsController } from '../controllers/students.controller';
import { StudentsService } from '../services/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { StudentSubject } from '../entities/student-subject.entity';
import { Subject } from '../entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Subject, StudentSubject])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
