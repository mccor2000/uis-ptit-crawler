import mongoose from "mongoose";

export const createOrUpdate = async (
  model: mongoose.Model<any>,
  data: { _id: string }
) => {
  return model.findOneAndUpdate({ _id: data._id }, data, {
    upsert: true,
    setDefaultsOnInsert: true,
  });
};
