const jsonFile = require("jsonfile");

const getAllPermissions = () => {
  console.log("getAllPermisdfdfsions");
  return new Promise((resolve, reject) => {
    jsonFile.readFile("./json/permissions.json", (err, permissions) => {
      if (err) {
        reject(err);
      } else {
        resolve(permissions);
      }
    });
  });
};

const getPermissionsById = (userId) => {
  return new Promise((resolve, reject) => {
    jsonFile.readFile("./json/permissions.json", (err, permissions) => {
      if (err) {
        reject(err);
      } else {
        const spesific = permissions.find((el) => el.userId === userId);
        resolve(spesific);
      }
    });
  });
};

const addPermissions = async (newPermissions) => {
  const allPermissions = await getAllPermissions();
  allPermissions.push(newPermissions);

  await jsonFile
    .writeFile("./json/permissions.json", allPermissions)
    .then((res) => {
      console.log("permissions Added");
    })
    .catch((error) => console.error(error));
  return "permissions Added";
};

const updatePermissions = async (userId, permissionsObj) => {
  const allPermissions = await getAllPermissions();
  const empIndex = allPermissions.findIndex((el) => el.userId === userId);
  allPermissions.splice(empIndex, 1, permissionsObj);

  await jsonFile
    .writeFile("./json/permissions.json", allPermissions)
    .then((res) => {
      console.log("permissions updated");
    })
    .catch((error) => console.error(error));
  return "permissions updated";
};

const deletePermissions = async (empliyeeId) => {
  const allPermissions = await getAllPermissions();
  const empIndex = allPermissions.findIndex((el) => el.userId === userId);
  allPermissions.splice(empIndex, 1);

  await jsonFile
    .writeFile("./json/permissions.json", allPermissions)
    .then((res) => {
      console.log("permissions deleted");
    })
    .catch((error) => console.error(error));
  return "permissions deleted";
};

module.exports = {
  getAllPermissions,
  getPermissionsById,
  addPermissions,
  updatePermissions,
  deletePermissions,
};

// // [{"empliyeeId": "sdsd" ,"name":"dod"},{"empliyeeId": "wewe", "name":"hatov"}]
// // const obj= [{empliyeeId: "sdsdsd" ,name:"dod"},{empliyeeId: "wewe", name:"hatov"}]
// const obj = { empliyeeId: "azaz", name: "koki" };
// const test = async () => {
//   console.log(await addPermissions(obj));
// };
// test();
// // [{"empliyeeId": "sdsd" ,"permissions":"View Subscriptions","Create Subscriptions"},{"empliyeeId": "wewe","permissions":"View Subscriptions"}]
