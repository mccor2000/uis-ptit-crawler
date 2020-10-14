import { Schema, model, Document } from "mongoose";

export interface Student extends Document {
  studentId: string;
  firstName: string;
  lastName: string;
  classId: string;
  joinedClasses: [string];
}

export const StudentSchema = new Schema({
  studentId: {
    type: String,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  classId: {
    type: String,
    required: true,
  },

  joinedClasses: {
    type: [String],
    default: [],
  },
});

export const StudentModel = model("student", StudentSchema, "students");
