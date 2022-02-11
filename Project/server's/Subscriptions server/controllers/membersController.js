const express = require("express");
const memberServices = require("../services/memberServices");

const router = express.Router();

/*
map :)

_id = member _id


members:
get all: method-get /members
get by id: method-get /members/:_id
post new member: method-post /members
update by id: method-put /members/:_id
Delete by id: method-delete /members/:_id


*/

//get all members
router.route("/").get(async (request, response) => {
  try {
    const members = await memberServices.getAllMembers();

    return response.json(members);
  } catch (error) {
    return response.json(error);
  }
});

//get members by id
router.route("/:_id").get(async (request, response) => {
  try {
    const _id = request.params._id;
    const member = await memberServices.getMemberById(_id);
    return response.json(member);
  } catch (error) {
    return response.json(error);
  }
});

//post
router.route("/").post(async (request, response) => {
  try {
    const newMember = request.body;
    const member = await memberServices.addMember(newMember);

    return response.json(member);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:_id").put(async (request, response) => {
  try {
    const _id = request.params._id;
    const updateMember = request.body;
    const member = await memberServices.updateMember(_id, updateMember);
    return response.json(member);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:_id").delete(async (request, response) => {
  try {
    const _id = request.params._id;
    const member = await memberServices.deleteMember(_id);
    return response.json(member);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
