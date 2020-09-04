import { ApiProperty } from '@nestjs/swagger';
 
export class CreateDepartmentDTO {
     _id: any;

    @ApiProperty({description: 'Department Name'})
    readonly departmentName: string;

    @ApiProperty({description: 'Parent Department id' ,required: false})
    readonly parentDepartment: string;

    @ApiProperty({description: 'Array of the teachers id',required: false})
    readonly teachers: Array<string>;

    @ApiProperty({description: 'Array of the mentors id',required: false})
    readonly mentors: Array<string>;

    @ApiProperty({description: 'Course department Date'})
    createdDate: Date;

    @ApiProperty({description: 'Department created User id'})
    createdDUser: string; 
}