const express = require("express");
const employeeBL = require("../BL/employeeBL");

const router = express.Router();

/*
map :)

_id = employee _id


employees:
get all: method-get /employees
get by id: method-get /employees/:_id
post new employee: method-post /employees
update by id: method-put /employees/:_id
Delete by id: method-delete /employees/:_id


*/

//get all employees
router.route("/").get(async (request, response) => {
  console.log("get all employees");
  try {
    const employees = await employeeBL.getAllEmployee();

    return response.json(employees);
  } catch (error) {
    return response.json(error);
  }
});



//get employees by id
router.route("/:_id").get(async (request, response) => {
  try {
    const _id = request.params._id;
    const employee = await employeeBL.getEmployeeById(_id);
    return response.json(employee);
  } catch (error) {
    return response.json(error);
  }
});

//post
router.route("/").post(async (request, response) => {
  try {
    const newEmployee = request.body;
    const employee = await employeeBL.addEmployee(newEmployee);

    return response.json(employee);
  } catch (error) {
    console.log(error);
    return response.json(error);
  }
});

//put \ update
router.route("/:_id").put(async (request, response) => {
  try {
    const _id = request.params._id;
    const updateEmployee = request.body;
    const employee = await employeeBL.updateEmployee(_id, updateEmployee);
    return response.json(employee);
  } catch (error) {
    return response.json(error);
  }
});

//delete
router.route("/:_id").delete(async (request, response) => {
  try {
    const _id = request.params._id;
    const employee = await employeeBL.deleteEmployee(_id);
    return response.json(employee);
  } catch (error) {
    return response.json(error);
  }
});

module.exports = router;
