import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    _id: String,
    courseName: String,
    parentDepartment: String,
    hoursNumber: Number,
    lecturesNumber: Number,
    seminarsNumber: Number,
    practicesNumber: Number,
    laboratoryWorksNumber: Number,
    selfEducationHours: Number,
    controlWorksNumber: Number,
    consultationsNumber: Number,
    students: Array,
    createdDate: Date,
    createdDUser: String 
});