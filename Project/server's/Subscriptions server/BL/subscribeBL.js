const subscribeServices = require("../services/subscribeServices");

const getAllSub = async () => {
  return await subscribeServices.getAllSubscribers();
};

const getBySubId = async (SubId) => {
  try {
    const response = await subscribeServices.getSubscriberById(SubId);
    if (response !== undefined) {
      return response;
    } else {
      return "getBySubId faild - maby subscriber didn funde";
    }
  } catch (error) {
    return `${error}
    ====getSubscriberById didnt find a match=======  `;
  }
};

const getSubBymemberId = async (memberId) => {
  const allSubscribers = await subscribeServices.getAllSubscribers();

  const subscriber = allSubscribers.find((el) => el.MemberId == memberId);
  if (subscriber !== undefined) {
    return subscriber;
  } else {
    return "getSubBymemberId faild - maby menmer didn funde";
  }
};

const postSub = async (newSub) => {
  return await subscribeServices.addSubscriber(newSub);
};

const updateSub = async (memberId, updatedSub) => {
  const subscriber = await getSubBymemberId(memberId);
  if (subscriber !== undefined) {
    return await subscribeServices.updateSubscriber(subscriber._id, updatedSub);
  } else {
    return "addShowToSub faild - maby menmer didn funde";
  }
};

//add show and time to subscriber
const addShowToSub = async (memberId, showId, date) => {
  const subscriber = await getSubBymemberId(memberId);
  if (subscriber !== undefined) {
    const newSub = { showId: showId, date: date };
    subscriber.Shows.push(newSub);
    return await updateSub(subscriber.MemberId, subscriber);
  } else {
    return "addShowToSub faild - maby menmer didn funde";
  }
};

//romove show and time from subscriber
const removeShowFromSub = async (memberId, showId) => {
  const subscriber = await getSubBymemberId(memberId);
  if (subscriber !== undefined) {
    const showIndex = subscriber.Shows.findIndex((el) => el.showId === showId);
    if (showIndex === -1) {
      return "removeShowFromSub faild - not exist movies or not a match ";
    } else {
      subscriber.Shows.splice(showIndex, 1);
      return await updateSub(memberId, subscriber);
    }
  } else {
    return "removeShowFromSub faild - maby menmer didn funde";
  }
};

//update date to subscriber
const changeDateToSub = async (memberId, showId, date) => {
  const subscriber = await getSubBymemberId(memberId);

  if (subscriber !== undefined) {
    const showIndex = subscriber.Shows.findIndex((el) => el.showId === showId);
    if (showIndex === -1) {
      return "removeShowFromSub faild - not exist movies or not a match ";
    } else {
      const newObj = { showId: showId, date: date };
      subscriber.Shows.splice(showIndex, 1, newObj);
      return await updateSub(memberId, subscriber);
    }
  } else {
    return "changeDateToSub faild - maby menmer didn funde";
  }
};

//delete sub
const deleteSub = async (memberId) => {
  const subscriber = await getSubBymemberId(memberId);
  if (subscriber !== undefined) {
    return await subscribeServices.deleteSubscriber(subscriber._id);
  } else {
    return "deleteSub faild - maby menmer didn funde";
  }
};

// =() =>{}
module.exports = {
  getAllSub,
  getBySubId,
  getSubBymemberId,
  postSub,
  updateSub,
  addShowToSub,
  removeShowFromSub,
  changeDateToSub,
  deleteSub,
};
