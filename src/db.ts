import mongoose from "mongoose";
import config from "./config";

export default async () => {
  mongoose.connection.on("connected", () => {
    console.log("db connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("db disconnected");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`db error: ${err}`);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("db disconnected due to process exit");
    });

    process.exit(0);
  });

  await mongoose.connect(config.db.url, config.db.options);
};
