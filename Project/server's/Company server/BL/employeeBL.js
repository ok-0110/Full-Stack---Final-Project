const jsonFile = require("jsonfile");

const getAllEmployee = () => {
  return new Promise((resolve, reject) => {
    jsonFile.readFile("./json/employee.json", (err, employee) => {
      if (err) {
        reject(err);
      } else {
        resolve(employee);
      }
    });
  });
};

const getEmployeeById = (userId) => {
  return new Promise((resolve, reject) => {
    jsonFile.readFile("./json/employee.json", (err, employee) => {
      if (err) {
        reject(err);
      } else {
        const spesific = employee.find((el) => el.userId === userId);
        resolve(spesific);
      }
    });
  });
};

const addEmployee = async (newEmployee) => {
  const allEmployee = await getAllEmployee();
  allEmployee.push(newEmployee);

  await jsonFile
    .writeFile("./json/employee.json", allEmployee)
    .then((res) => {
      console.log("employee Added");
    })
    .catch((error) => console.error(error));
  return "employee Added";
};

const updateEmployee = async (userId, employeeObj) => {
  const allEmployee = await getAllEmployee();
  const empIndex = allEmployee.findIndex((el) => el.userId === userId);
  allEmployee.splice(empIndex, 1, employeeObj);

  await jsonFile
    .writeFile("./json/employee.json", allEmployee)
    .then((res) => {
      console.log("employee updated");
    })
    .catch((error) => console.error(error));
  return "employee updated";
};

const deleteEmployee = async (userId) => {
  const allEmployee = await getAllEmployee();
  const empIndex = allEmployee.findIndex((el) => el.userId === userId);
  allEmployee.splice(empIndex, 1);

  await jsonFile
    .writeFile("./json/employee.json", allEmployee)
    .then((res) => {
      console.log("employee deleted");
    })
    .catch((error) => console.error(error));
  return "employee deleted";
};

module.exports = { getAllEmployee, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };

// // [{"empliyeeId": "sdsd" ,"name":"dod"},{"empliyeeId": "wewe", "name":"hatov"}]
// // const obj= [{empliyeeId: "sdsdsd" ,name:"dod"},{empliyeeId: "wewe", name:"hatov"}]
// const obj = { empliyeeId: "azaz", name: "koki" };
// const test = async () => {
//   console.log(await addEmployee(obj));
// };
// test();
