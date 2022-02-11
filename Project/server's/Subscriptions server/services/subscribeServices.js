const subscribersModel = require("../models/subscribersModel");

//get all
const getAllSubscribers = () => {
  return new Promise((resolve, reject) => {
    subscribersModel.find({}, (err, subscribers) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscribers);
      }
    });
  });
};

//get by subscriber id
const getSubscriberById = (_id) => {
  return new Promise((resolve, reject) => {
    subscribersModel.findById(_id, (err, subscribe) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscribe);
      }
    });
  });
};

//post subscribe
const addSubscriber = (newSubscriber) => {
  return new Promise((resolve, reject) => {
    const subscribe = new subscribersModel(newSubscriber);
    subscribe.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Added");
      }
    });
  });
};

//update \ put subscribe
const updateSubscriber = (_id, subscribeToUpdate) => {
  return new Promise((resolve, reject) => {
    subscribersModel.findByIdAndUpdate(_id, subscribeToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Updated");
      }
    });
  });
};

//delete
const deleteSubscriber = (_id) => {
  return new Promise((resolve, reject) => {
    subscribersModel.findByIdAndDelete(_id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllSubscribers,
  getSubscriberById,
  addSubscriber,
  updateSubscriber,
  deleteSubscriber,
};
