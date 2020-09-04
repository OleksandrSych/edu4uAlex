import { Document } from 'mongoose';

export interface Course extends Document {
    readonly _id: string;
    readonly courseName: string;
    readonly parentDepartment: string;
    readonly hoursNumber: number;
    readonly lecturesNumber: number;
    readonly seminarsNumber: number;
    readonly practicesNumber: number;
    readonly laboratoryWorksNumber: number;
    readonly selfEducationHours: number;
    readonly controlWorksNumber: number;
    readonly consultationsNumber: number;
    readonly students: Array<String>;
    readonly createdDate: Date;
    readonly createdDUser: string; 
}