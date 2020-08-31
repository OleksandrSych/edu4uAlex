
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    contactPhone: String,
    title: String,
    interests: String,
});