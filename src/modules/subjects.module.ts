import { Module } from '@nestjs/common';
import { SubjectsService } from '../services/subjects.service';
import { SubjectsController } from '../controllers/subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Subject } from '../entities/subject.entity';
import { StudentSubject } from '../entities/student-subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Subject, StudentSubject])],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
