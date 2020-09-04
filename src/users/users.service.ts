import { Injectable, ForbiddenException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { ObjectId } from 'mongodb';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
  async getUser(userID): Promise<User> { 
    const user = await this.userModel
      .findOne({_id: userID})
      .exec(); 
    return user;
  }
  async findUserByEmail(email: string): Promise<User | undefined> { 
    const user = await this.userModel.findOne({"email" : email}).exec(); 
    return user;
  }
  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO._id = new ObjectId();
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }
  async editUser(id, createUserDTO: CreateUserDTO): Promise<User> {
    const editedUser = await this.userModel
      .findByIdAndUpdate(id, createUserDTO, { new: true });
    return editedUser;
  }
  async deleteUser(id): Promise<any> {
    const deletedUser = await this.userModel
      .findByIdAndRemove(id);
    return deletedUser;
  }
  async checkEmail(email: string) {
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new ForbiddenException('User with this email already exists');
    }
  }
}  