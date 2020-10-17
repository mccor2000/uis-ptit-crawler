import { Schema, model, Document } from "mongoose";

// import { StudentModel } from "./student";

export interface CreditClass extends Document {
  classId: string;
  subjectId: string;
  subjectTitle: string;
  group: string;
  credits: string;
  classes: [string];
  schedule: [
    {
      day: string;
      room: string;
      startTime: string;
      duration: string;
      startDate: string;
      endDate: string;
    }
  ];
  students: [
    {
      studentId: string;
      firstName: string;
      lastName: string;
      classId: string;
    }
  ];
}

export const CreditClassSchema = new Schema({
  classId: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    required: true,
  },

  subjectTitle: {
    type: String,
    require: true,
  },

  group: {
    type: String,
    required: true,
  },

  credits: {
    type: String,
    required: true,
  },

  classes: [String],

  schedule: [
    {
      day: String,
      room: String,
      startTime: String,
      duration: String,
      startDate: String,
      endDate: String,
    },
  ],

  students: [
    {
      studentId: String,
      firstName: String,
      lastName: String,
      classId: String,
    },
  ],
});

// CreditClassSchema.pre("save", async function () {
// const currentValue = (this as CreditClass).students;
//
// const register = currentValue.map((student) => {
// StudentModel.findOneAndUpdate(
// { studentId: student.studentId },
// { $push: { joinedClasses: this._id } }
// );
// });
//
// await Promise.all(register);
// });

export const CreditClassModel = model(
  "credit_class",
  CreditClassSchema,
  "credit_classes"
);
