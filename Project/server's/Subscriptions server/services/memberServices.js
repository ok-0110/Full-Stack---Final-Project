const axios = require("axios");
const membersModel = require("../models/membersModel");
const subscribeServices = require("./subscribeServices");

//get all
const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    membersModel.find({}, (err, members) => {
      if (err) {
        reject(err);
      } else {
        resolve(members);
      }
    });
  });
};

//get by id
const getMemberById = (_id) => {
  return new Promise((resolve, reject) => {
    membersModel.findById(_id, (err, member) => {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

//post member
const addMember = (newMember) => {
  return new Promise((resolve, reject) => {
    const member = new membersModel(newMember);

    const newSubscriber = {
      MemberId: member._id,
      Movies: [],
    };
    subscribeServices.addSubscriber(newSubscriber);

    member.save((err) => {
      if (err) {
        reject(err);
      } else {
        
        resolve("Info Added");
      }
    });
  });
};

//post members from jsonplaceholder
const addMembersFromPlaceholder = async () => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  let data = response.data;
  data.forEach((element) => {
    const newMember = {
      Name: element.name,
      Email: element.email,
      City: element.address.city,
    };
    addMember(newMember);

    console.log(`${element.name} added`);
  });

  return response.data;
};

//update \ put member
const updateMember = (_id, memberToUpdate) => {
  return new Promise((resolve, reject) => {
    membersModel.findByIdAndUpdate(_id, memberToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Updated");
      }
    });
  });
};

//delete
const deleteMember = (_id) => {
  return new Promise((resolve, reject) => {
    membersModel.findByIdAndDelete(_id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  addMembersFromPlaceholder,
};
