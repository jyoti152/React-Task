import * as moment from 'moment';
import { Schema, model, Document, Model } from 'mongoose'

export interface IdepartmentInterface {
    is_delete: boolean;
    name: string;
    maxEmployee: number;
    maxSalary: number
};

export interface departmentInterface_b extends IdepartmentInterface, Document { };

interface departmentModel extends Model<departmentInterface_b> {
    save(person: string): string
}

export const departmentSchema: Schema<departmentInterface_b> = new Schema(
    {

        name: { type: String, required: false },
        is_delete: { type: Boolean, required: false },
        maxEmployee: { type: Number, required: false },
        maxSalary: { type: Number, required: false },
    }
)

export const departmentModel = model<departmentInterface_b, departmentModel>(
    "department",
    departmentSchema
);
