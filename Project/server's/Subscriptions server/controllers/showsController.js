const express = require("express");
const showServices = require("../services/showServices");

const router = express.Router();

/*
map :)

_id = show _id


shows:
get all: method-get /shows
get by id: method-get /shows/:_id
post new show: method-post /shows
update by id: method-put /shows/:_id
Delete by id: method-delete /shows/:_id


*/

//get all shows
router.route("/").get(async (request, response) => {
  try {
    const shows = await showServices.getAllShows();

    return response.json(shows);
  } catch (error) {
    return response.json(error);
  }
});

//get shows by id
router.route("/:_id").get(async (request, response) => {
  try {
    const _id = request.params._id;
    const show = await showServices.getShowById(_id);
    return response.json(show);
  } catch (error) {
    return response.json(error);
  }
});

//post
router.route("/").post(async (request, response) => {
  try {
    const newShow = request.body;
    const show = await showServices.addShow(newShow);

    return response.json(show);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:_id").put(async (request, response) => {
  try {
    const _id = request.params._id;
    const updateShow = request.body;
    const show = await showServices.updateShow(_id, updateShow);
    return response.json(show);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:_id").delete(async (request, response) => {
  try {
    const _id = request.params._id;
    const show = await showServices.deleteShow(_id);
    return response.json(show);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
