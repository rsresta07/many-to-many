import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from '../dtos/create-subject.dto';
import { UpdateSubjectDto } from '../dtos/update-subject.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class SubjectsService {
  create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  findAll() {
    return `This action returns all subjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
