import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'subject_name', length: 255, unique: true })
  subjectName: string;

  @ManyToMany(() => Student, (student) => student.subjects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  students?: Student[];
}
