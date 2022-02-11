const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const subscribeSchema = new Schema({
  MemberId: String,
  Shows: Array,
 
});

module.exports = Mongoose.model("subscriber", subscribeSchema);

/*
subscribe:
{
    "MemberId": {} ,
    "Shows": [{ showId:  "61fe8836de65575d175427f4", date: `2021-10-07`}],
    
}
*/
