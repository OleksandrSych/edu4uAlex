import { Document } from 'mongoose';

export interface User extends Document {
    readonly _id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly contactPhone: string;
    readonly title: string;
    readonly interests: string;
    readonly role: string;
}