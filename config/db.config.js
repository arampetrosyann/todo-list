const mongoose = require("mongoose");
const env = require("./env.config");

const connectDb = async () => {
  await mongoose.connect(env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = connectDb;
