import { Module } from '@nestjs/common';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import {  DepartmentSchema } from './schemas/department.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [  
    MongooseModule.forFeature([{ name: 'Department', schema: DepartmentSchema }]),],
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  exports: [UniversitiesService]
})
export class UniversitiesModule {}
