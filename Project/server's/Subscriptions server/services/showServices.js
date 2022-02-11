const axios = require("axios");
const showsModel = require("../models/showsModel");

//get all
const getAllShows = () => {
  return new Promise((resolve, reject) => {
    showsModel.find({}, (err, shows) => {
      if (err) {
        reject(err);
      } else {
        resolve(shows);
      }
    });
  });
};

//get by id
const getShowById = (_id) => {
  return new Promise((resolve, reject) => {
    showsModel.findById(_id, (err, show) => {
      if (err) {
        reject(err);
      } else {
        resolve(show);
      }
    });
  });
};

//post show
const addShow = (newShow) => {
  return new Promise((resolve, reject) => {
    const show = new showsModel(newShow);
    show.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Added");
      }
    });
  });
};

//post shows from tvmaze
const addShowsFromTvmaze = async () => {
  const response = await axios.get(`https://api.tvmaze.com/shows`);
  let data = response.data;
  const first_X_Shows = data.slice(0,15)
  first_X_Shows.forEach((element) => {
    const newShow = {
      Name: element.name,
      Genres: element.genres,
      Image: element.image.medium,
      Premiered: element.premiered,
    };
    addShow(newShow);
    console.log(`${element.name} added`);
  });

  return response.data;
};

//update \ put show
const updateShow = (_id, showToUpdate) => {
  return new Promise((resolve, reject) => {
    showsModel.findByIdAndUpdate(_id, showToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Info Updated");
      }
    });
  });
};

//delete
const deleteShow = (_id) => {
  return new Promise((resolve, reject) => {
    showsModel.findByIdAndDelete(_id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
  addShowsFromTvmaze,
};
