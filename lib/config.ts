import dotenv from "dotenv";
dotenv.config();

export default {
  db: {
    url: process.env.MONGODB_URL || "",
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  url: process.env.URL || "",
  username: process.env.USERNAME || "",
  password: process.env.PASSWORD || "",
};
