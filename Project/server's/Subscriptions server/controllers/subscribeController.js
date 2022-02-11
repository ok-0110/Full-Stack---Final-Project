const express = require("express");
const subBL = require("../BL/subscribeBL");

const router = express.Router();

/*
map :)

subs:
get all: method-get /subscribers

get by subId: method-get /subscribers/subId/:subId
get by memnerId: method-get /subscribers/memnerId/:memnerId

post new sub: method-post /subscribers (send obj)

update by memberId: method-put /subscribers/:memberId

add show to sub: method-put /subscribers/addShow/:memberId/:showId/:date
remove show from sub: method-put /subscribers/removeShow/:memberId/:showId
change date to specific show in sub: method-put /subscribers/changeDate/:memberId/:showId/:date

Delete by memberId: method-delete /subscribers/:memberId

*/

//get all subs
router.route("/").get(async (request, response) => {
  try {
    const subs = await subBL.getAllSub();

    return response.json(subs);
  } catch (error) {
    return response.json(error);
  }
});

//get subs by sub id
router.route("/subId/:subId").get(async (request, response) => {
  try {
    const subId = request.params.subId;
    const sub = await subBL.getBySubId(subId);
    return response.json(sub);
  } catch (error) {
    return response.json(error);
  }
});
//get subs by memner id
router.route("/memnerId/:memnerId").get(async (request, response) => {
  try {
    const memnerId = request.params.memnerId;
    const sub = await subBL.getSubBymemberId(memnerId);
    return response.json(sub);
  } catch (error) {
    return response.json(error);
  }
});

//post sub
router.route("/").post(async (request, response) => {
  try {
    const newSub = request.body;
    const sub = await subBL.postSub(newSub);

    return response.json(sub);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:memberId").put(async (request, response) => {
  try {
    const memberId = request.params.memberId;
    const updateSub = request.body;
    const sub = await subBL.updateSub(memberId, updateSub);
    return response.json(sub);
  } catch (error) {
    return response.json(error);
  }
});

//add show to sub
router.route("/addShow/:memberId/:showId/:date").put(async (request, response) => {
  try {
    const memberId = request.params.memberId;
    const showId = request.params.showId;
    const date = request.params.date;

     

    const sub = await subBL.addShowToSub(memberId, showId, date);
    return response.json(sub);
  } catch (error) {
    console.log("00");
    return response.status(404).json('I dont have that');
  }
});

//remove show from sub
router.route("/removeShow/:memberId/:showId").put(async (request, response) => {
  try {
    const memberId = request.params.memberId;
    const showId = request.params.showId;

    const sub = await subBL.removeShowFromSub(memberId, showId);
    return response.json(sub);
  } catch (error) {
    return response.json(error);
  }
});

//change date to specific show in sub
router.route("/changeDate/:memberId/:showId/:date").put(async (request, response) => {
  try {
    const memberId = request.params.memberId;
    const showId = request.params.showId;
    const date = request.params.date;

    const sub = await subBL.changeDateToSub(memberId, showId, date);
    return response.json(sub);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:memberId").delete(async (request, response) => {
  try {
    const memberId = request.params.memberId;
    const sub = await subBL.deleteSub(memberId);
    return response.json(sub);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
