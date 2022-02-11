const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  UserName: String,
  Password: String,
 
});

module.exports = Mongoose.model("user", userSchema);

/*
user:
{
    "UserName": "" ,
    "Password": ""
    
}
*/
