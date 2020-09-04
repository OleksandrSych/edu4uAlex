import { Document } from 'mongoose';

export interface Department extends Document {
    readonly _id: string;
    readonly departmentName: string;
    readonly parentDepartment: string;
    readonly teachers: Array<string>;
    readonly mentors: Array<string>;
    readonly createdDate: Date;
    readonly createdDUser: string; 
}