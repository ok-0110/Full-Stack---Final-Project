const Mongoose = require("mongoose");

const connectToDb = () => {
  const uri = "mongodb://localhost:27017/companyDB";

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  Mongoose.connect(uri, options);
  console.log("connected to company DB");
};

module.exports = connectToDb;
