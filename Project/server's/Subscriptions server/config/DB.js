const Mongoose = require("mongoose");

const connectToDb = () => {
  const uri = "mongodb://localhost:27017/SubscriptionsDB";

  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  Mongoose.connect(uri, options);
  console.log("connected to Subscriptions DB");
};

module.exports = connectToDb;
