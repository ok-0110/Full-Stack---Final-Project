const express = require("express");
const permissionsBL = require("../BL/permissionsBL");

const router = express.Router();

/*
map :)

_id = permissions _id


permissionss:
get all: method-get /permissionss
get by id: method-get /permissionss/:_id
post new permissions: method-post /permissionss
update by id: method-put /permissionss/:_id
Delete by id: method-delete /permissionss/:_id


*/

//get all permissionss
router.route("/").get(async (request, response) => {
  try {
    const permissionss = await permissionsBL.getAllPermissions();

    return response.json(permissionss);
  } catch (error) {
    return response.json(error);
  }
});



//get permissionss by id
router.route("/:_id").get(async (request, response) => {
  try {
    const _id = request.params._id;
    const permissions = await permissionsBL.getPermissionsById(_id);
    return response.json(permissions);
  } catch (error) {
    return response.json(error);
  }
});

//post
router.route("/").post(async (request, response) => {
  try {
    const newPermissions = request.body;
    const permissions = await permissionsBL.addPermissions(newPermissions);

    return response.json(permissions);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:_id").put(async (request, response) => {
  try {
    const _id = request.params._id;
    const updatePermissions = request.body;
    const permissions = await permissionsBL.updatePermissions(_id, updatePermissions);
    return response.json(permissions);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:_id").delete(async (request, response) => {
  try {
    const _id = request.params._id;
    const permissions = await permissionsBL.deletePermissions(_id);
    return response.json(permissions);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
