import { Schema, model } from "mongoose";

export const StudentSchema = new Schema({
  _id: {
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

  classID: {
    type: String,
    required: true,
  },

  joinedClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
});

export const StudentModel = model("student", StudentSchema, "students");
