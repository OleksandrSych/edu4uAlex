import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from './interfaces/department.interface';
import { ObjectId } from 'mongodb';
import { CreateDepartmentDTO } from './dto/create-department.dto';

@Injectable()
export class UniversitiesService {

    constructor(@InjectModel('Department') private readonly departmentModel: Model<Department>) { }
    async getDepartments(id) : Promise<Department[]> {
        const users = await this.departmentModel
            .find({"parentDepartment" : id})
            .exec();
        return users;
    }
    async getDepartment(id): Promise<Department> { 
        const department = await this.departmentModel
            .findOne({_id: id})
            .exec(); 
        return department;
    }
    async addDepartment(createDepartmentDTO: CreateDepartmentDTO): Promise<Department> {
        createDepartmentDTO._id = new ObjectId();
        const newDepartment = await new this.departmentModel(createDepartmentDTO);
        return newDepartment.save();
    }
    async editDepartment(id: any, createDepartmentDTO: CreateDepartmentDTO) : Promise<Department> {
        const editedUser = await this.departmentModel
            .findByIdAndUpdate(id, createDepartmentDTO, { new: true });
        return editedUser;
    }
    async deleteDepartment(id): Promise<any> {
        const deletedUser = await this.departmentModel
            .findByIdAndRemove(id);
        return deletedUser;
    }
}
