import { Schema, model } from "mongoose";

export const CreditClassSchema = new Schema({
  subjectCode: {
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

  credit: {
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

  students: Array,
});

export const CreditClass = model(
  "credit_class",
  CreditClassSchema,
  "credit_classes"
);
