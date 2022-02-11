
const usersModel = require("../models/userModel");

//get all
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    usersModel.find({}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

//get by id
const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    usersModel.findById(_id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

//post user
const addUser = (newUser) => {
  return new Promise((resolve, reject) => {
    const user = new usersModel(newUser);


    user.save((err) => {
      if (err) {
        reject(err);
      } else {
        
        resolve(user);
      }
    });
  });
};



//update \ put user
const updateUser = (_id, userToUpdate) => {
  return new Promise((resolve, reject) => {
    usersModel.findByIdAndUpdate(_id, userToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Updated");
      }
    });
  });
};

//delete
const deleteUser = (_id) => {
  return new Promise((resolve, reject) => {
    usersModel.findByIdAndDelete(_id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
