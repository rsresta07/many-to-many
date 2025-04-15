import { Module } from '@nestjs/common';
import { SubjectsService } from '../services/subjects.service';
import { SubjectsController } from '../controllers/subjects.controller';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
