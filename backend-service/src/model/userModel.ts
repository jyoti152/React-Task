import * as moment from 'moment';
import { Schema, model, Document, Model } from 'mongoose'

export interface IuserInterface {
  is_delete: boolean;
  name: string;
  dob: moment.Moment,
  email: string,
  profile: string,
  password: string,
  salary: number,
  active: boolean,
  joiningDate: moment.Moment,
  position: string,
  age: number,
  department: { _id: string, name: string, maxEmployee: number, maxSalary: number }
};

export interface userInterface_b extends IuserInterface, Document { };

interface userModel extends Model<userInterface_b> {
  save(person: string): string
}

export const userSchema: Schema<userInterface_b> = new Schema(
  {

    name: { type: String, required: false },
    is_delete: { type: Boolean, required: false },
    dob: { type: Date, required: false },
    email: { type: String, required: false },
    profile: { type: String, required: false },
    password: { type: String, required: false },
    salary: { type: Number, required: false },
    active: { type: Boolean, required: false },
    joiningDate: { type: Date, required: false },
    position: { type: String, required: false },
    age: { type: Number, required: false },
    department: { _id: String, name: String, maxEmployee: Number, maxSalary: Number }
  }
)

export const userModel = model<userInterface_b, userModel>(
  "user",
  userSchema
);
