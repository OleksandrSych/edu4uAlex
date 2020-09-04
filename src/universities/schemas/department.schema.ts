import * as mongoose from 'mongoose';

export const DepartmentSchema = new mongoose.Schema({
    _id: String,
    departmentName: String,
    parentDepartment: String,
    teachers: Array,
    mentors: Array,
    createdDate: Date,
    createdDUser: String,
});