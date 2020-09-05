import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Course } from './interfaces/course.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { CreateCourseDTO } from './dto/create-course.dto';


@Injectable()
export class CoursesService {
    
    constructor(@InjectModel('Course') private readonly courseModel: Model<Course>) { }
    async getCourses() : Promise<Course[]> {
        const courses = await this.courseModel.find().exec();
        return courses;
    }
    async getCourse(id): Promise<Course> { 
        const course = await this.courseModel
            .findOne({_id: id})
            .exec(); 
        return course;
    }
    async getCoursesDepartmentId(id): Promise<Course[]> {
        const courses = await this.courseModel
            .find({"parentDepartment" : id})
            .exec();
        return courses;
    }
    async addCourse(createCourseDTO: CreateCourseDTO): Promise<Course> {
        createCourseDTO._id = new ObjectId();
        const newCourse = await new this.courseModel(createCourseDTO);
        return newCourse.save();
    }
    async editCourse(id: any, createCourseDTO: CreateCourseDTO) : Promise<Course> {
        const editedCourse= await this.courseModel
            .findByIdAndUpdate(id, createCourseDTO, { new: true });
        return editedCourse;
    }
    async deleteCourse(id): Promise<any> {
        const deletedCourse = await this.courseModel
            .findByIdAndRemove(id);
        return deletedCourse;
    }
    
}
