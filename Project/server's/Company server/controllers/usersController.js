const express = require("express");
const userServices = require("../services/userServices");

const router = express.Router();

/*
map :)

_id = user _id


users:
get all: method-get /users
get by id: method-get /users/:_id
post new user: method-post /users
update by id: method-put /users/:_id
Delete by id: method-delete /users/:_id


*/

//get all users
router.route("/").get(async (request, response) => {
  try {
    const users = await userServices.getAllUsers();

    return response.json(users);
  } catch (error) {
    return response.json(error);
  }
});

//get users by id
router.route("/:_id").get(async (request, response) => {
  try {
    const _id = request.params._id;
    const user = await userServices.getUserById(_id);
    return response.json(user);
  } catch (error) {
    return response.json(error);
  }
});

//post
router.route("/").post(async (request, response) => {
  try {
    const newUser = request.body;
    const user = await userServices.addUser(newUser);

    return response.json(user);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:_id").put(async (request, response) => {
  try {
    const _id = request.params._id;
    const updateUser = request.body;
    const user = await userServices.updateUser(_id, updateUser);
    return response.json(user);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:_id").delete(async (request, response) => {
  try {
    const _id = request.params._id;
    const user = await userServices.deleteUser(_id);
    return response.json(user);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
