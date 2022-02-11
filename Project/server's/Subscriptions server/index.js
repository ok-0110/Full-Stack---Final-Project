//expres
const express = require("express"); //thig to bild server
const app = express(); //name the thing to bild server

app.use(express.json()); // thing to convet json to obj
app.use(express.urlencoded({ extended: true })); //anather thing to convet json to obj

//cros
const cors = require("cors"); //thing to acsess data
app.use(cors()); //activate thing to acsess data

//DB
const connectToDB = require("./config/DB"); //"link" to connect the DB to the server
connectToDB(); //to activate the connection the DB to the server

//controlers
const memberController = require("./controllers/membersController");
app.use("/subscriptions/members", memberController); //http://localhost:8080/subscriptions/members

const showController = require("./controllers/showsController");
app.use("/subscriptions/shows", showController); //http://localhost:8080/subscriptions/shows

const subscriberController = require("./controllers/subscribeController");
app.use("/subscriptions/subscribers", subscriberController); //http://localhost:8080/subscriptions/subscribers

//start server
app.listen(8080, () => {
  console.log("the subscriptions server is listening");
  console.log("http://localhost:8080/subscriptions/");
});

//add members to DB (if not allredy exist)
const memberServices = require("./services/memberServices");

async function members() {
  console.log("check members");

  const members = await memberServices.getAllMembers();

  if (members.length === 0) {
    memberServices.addMembersFromPlaceholder();
    console.log(`adding members`);
  } else {
    console.log(`ther is a ${members.length} members`);
  }
}

//add shows to DB (if not allredy exist)
const showServices = require("./services/showServices");
async function shows() {
  console.log("check shows");

  let shows = await showServices.getAllShows();

  if (shows.length === 0) {
    showServices.addShowsFromTvmaze();
    console.log(`adding shows`);
  } else {
    console.log(`ther is a ${shows.length} shows`);
  }
}

const fun = async ()=>{
 await members();
 await shows();
}
fun()


