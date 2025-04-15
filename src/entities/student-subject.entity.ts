import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity('student_subject')
export class StudentSubject {
  @PrimaryColumn({ name: 'student_id' })
  studentId: number;

  @PrimaryColumn({ name: 'subject_id' })
  subjectId: number; // fixed name

  @ManyToOne(() => Student, (student) => student.subjects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.students, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'subject_id', referencedColumnName: 'id' }])
  subject: Subject;
}
