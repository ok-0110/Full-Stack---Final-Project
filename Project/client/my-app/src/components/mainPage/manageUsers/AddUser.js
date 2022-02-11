import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const navigate = useNavigate();
  const [coretTime, setCoretTime] = useState([]);
  const [newUserInfo, setNewUserInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    createdDate: new Date().toISOString().slice(0, 10),
    SessionTimeOut: 60,
  });
  const [newUserPermissions, setNewUserPermissions] = useState([
    false /*"View Subscriptions" */,
    false /*Create Subscriptions */,
    false /*Delete Subscriptions */,
    false /*View Movies */,
    false /*Create Movies */,
    false /*Delete Movies */,
  ]);

  const setUserInfo = (e) => {
    let user = { ...newUserInfo };
    user[e.target.name] = e.target.value;
    setNewUserInfo({ ...user });
  };

  const getTime = () => {
    let todayDate = new Date().toISOString().slice(0, 10);
    setCoretTime(todayDate);
  };

  const submit = async (e) => {
    e.preventDefault();

    //sand to db
    //Password: `${newUserInfo.lastName}1234`
    let newUser = {
      UserName: newUserInfo.userName,
      Password: `1234`,
    };
    const { data: userResponsFromDB } = await axios.post(
      `http://localhost:7070/company/users`,
      newUser
    );
    //get id tnd sand to employee.json
    newUser = { ...newUserInfo };
    // newUser.userName = "userName exist";
    newUser.userId = userResponsFromDB._id;

    await axios.post(`http://localhost:7070/company/employee`, newUser);

    //get id tnd sand to permisions.json
    const arrOfPermisions = checkboxsToArrOfString();
    const userPermi = { userId: userResponsFromDB._id, permissions: arrOfPermisions };
    await axios.post(`http://localhost:7070/company/permissions`, userPermi);

    //back to all users
    alert("user added");
  
    navigate("/manageusers/allusers")
  };

  const cancel = () => {
    navigate("/manageusers/allusers");
  };

  useEffect(() => {
    getTime();
  }, []);

  const hendelCheckbox = (e) => {
    const PermissionsArr = [...newUserPermissions];
    PermissionsArr[e.target.className] = e.target.checked;
    setNewUserPermissions(PermissionsArr);
  };

  const checkboxsToArrOfString = () => {
    const arrOfBol = [...newUserPermissions];
    //if have Create or Dalete => have to get view
    const arrOfOpsions = [
      "View Subscriptions",
      "Create Subscriptions",
      "Delete Subscriptions",
      "View Movies",
      "Create Movies",
      "Delete Movies",
    ];
    if (arrOfBol[1] || arrOfBol[2]) {
      arrOfBol[0] = true;
    }
    if (arrOfBol[4] || arrOfBol[5]) {
      arrOfBol[3] = true;
    }
    const arrOfPermisions = [];
    arrOfBol.forEach((el, index) => {
      if (el) {
        arrOfPermisions.push(arrOfOpsions[index]);
      }
    });
    return arrOfPermisions;
  };

  //========================================return
  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span>add user</span>
      <br />

      <form>
        <label htmlFor="View Subscriptions">View Subscriptions:</label>{" "}
        <input type={"checkbox"} onClick={hendelCheckbox} className="0" name="View Subscriptions" />
        <br />
        <label htmlFor="Create Subscriptions">Create Subscriptions:</label>{" "}
        <input
          type={"checkbox"}
          onClick={hendelCheckbox}
          className="1"
          name="Create Subscriptions"
        />
        <br />
        <label htmlFor="Delete Subscriptions">Delete Subscriptions:</label>{" "}
        <input
          type={"checkbox"}
          onClick={hendelCheckbox}
          className="2"
          name="Delete Subscriptions"
        />
        <br />
        <label htmlFor="View Movies">View Movies:</label>{" "}
        <input type={"checkbox"} onClick={hendelCheckbox} className="3" name="View Movies" />
        <br />
        <label htmlFor="Create Movies">Create Movies:</label>{" "}
        <input type={"checkbox"} onClick={hendelCheckbox} className="4" name="Create Movies" />
        <br />
        <label htmlFor="Delete Movies">Delete Movies:</label>{" "}
        <input type={"checkbox"} onClick={hendelCheckbox} className="5" name="Delete Movies" />
        <br />
        {/*  */}
        <label htmlFor="First Name">First Name: </label>
        <input type={"text"} onChange={setUserInfo} name="firstName" />
        <br />
        <label htmlFor="Last Name">Last Name: </label>
        <input type={"text"} onChange={setUserInfo} name="lastName" />
        <br />
        <label htmlFor="User Name">User Name: </label>
        <input type={"text"} onChange={setUserInfo} name="userName" />
        <br />
        <label htmlFor="Created date"> Created date: </label>
        <input type={"date"} onChange={setUserInfo} name="createdDate" defaultValue={coretTime} />
        <br />
        <label htmlFor="Session Time Out"> Session Time Out: </label>
        <input
          type={"number"}
          onChange={setUserInfo}
          name="SessionTimeOut"
          min={0}
          defaultValue={60}
        />
        <br />
        {/*  */}
        <label htmlFor="submit"></label>
        <input type={"submit"} value="Add" onClick={submit} name="submit" />
        &nbsp; &nbsp;
        <label htmlFor="cancel"></label>
        <input type={"button"} value="Cancel" onClick={cancel} name="cancel" />
        <br />
      </form>
    </div>
  );
}
