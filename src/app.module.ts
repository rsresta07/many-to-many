import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjectsModule } from './modules/subjects.module';
import { StudentsModule } from './modules/students.module';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    SubjectsModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
