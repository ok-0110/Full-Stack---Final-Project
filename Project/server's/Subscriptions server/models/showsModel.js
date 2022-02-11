const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const showSchema = new Schema({
  Name: String,
  Genres: Array,
  Image: String,
  Premiered: Date,
});

module.exports = Mongoose.model("Show", showSchema);

/*
show:
{
    "Name": "Cops",
    "Genres": ["Action","Crime"],
    "Image": "https://static.tvmaze.com/uploads/images/medium_portrait/1/4185.jpg",
    "Premiered": "1989-03-11"
}
*/
