import { Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  age: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: String,
});

export const User = model<IUser>('User', userSchema);
