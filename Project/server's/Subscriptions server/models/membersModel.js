const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const MemberSchema = new Schema({
  Name: String,
  Email: String,
  City: String,
});

module.exports = Mongoose.model("Member", MemberSchema);

/*
member:
{
    "Name": "dodi",
    "Email": "dodi@gmail.com",
    "City": "tlv"
}
*/