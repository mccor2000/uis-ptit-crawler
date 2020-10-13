import { Schema, model } from "mongoose";

export const SubjectSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "class",
    },
  ],
});

export const SubjectModel = model("subject", SubjectSchema, "subjects");
