import { Schema, model } from "mongoose";

export const RegularClassSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
  ],
});

export const RegularClass = model(
  "regular_class",
  RegularClassSchema,
  "regular_classes"
);
