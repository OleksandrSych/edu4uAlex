import { ApiProperty } from '@nestjs/swagger';
 
export class CreateCourseDTO {
    _id: any;
    @ApiProperty({description: 'Course Name'})
    readonly courseName: string;

    @ApiProperty({description: 'Parent Department id'})
    readonly parentDepartment: string;

    @ApiProperty({description: 'Course hours Number',required: false})
    readonly hoursNumber: number;

    @ApiProperty({description: 'Course lectures Number',required: false})
    readonly lecturesNumber: number;

    @ApiProperty({description: 'Course seminars Number',required: false})
    readonly seminarsNumber: number;

    @ApiProperty({description: 'Course practices Number',required: false})
    readonly practicesNumber: number;

    @ApiProperty({description: 'Course laboratory Works Number',required: false})
    readonly laboratoryWorksNumber: number;

    @ApiProperty({description: 'Course self Education Hours',required: false})
    readonly selfEducationHours: number;

    @ApiProperty({description: 'Course control Works Number',required: false})
    readonly controlWorksNumber: number;

    @ApiProperty({description: 'Course consultations Number',required: false})
    readonly consultationsNumber: number;

    @ApiProperty({description: 'Array of the students id',required: false})
    readonly students: Array<String>;

    @ApiProperty({description: 'Course created Date'})
    readonly createdDate: Date;

    @ApiProperty({description: 'Course created User id'})
    readonly createdDUser: string; 
}