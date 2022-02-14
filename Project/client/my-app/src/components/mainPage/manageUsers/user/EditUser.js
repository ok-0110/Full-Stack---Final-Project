import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { userid } = useParams();

  const [userFromDB, setUserFromDB] = useState({});
  const [employeeFromJson, setEmployeeFromJson] = useState({});
  const [premssionsFromJson, setPremssionsFromJson] = useState({ permissions: [] });

  //   setUserFromDB(
  // setEmployeeFromJson(
  // setPremssionsFromJson(
  const settingUser = async () => {
    const { data: usersFromAxios } = await axios.get(
      `http://localhost:7070/company/users/${userid}`
    );
    const { data: employeeFromAxios } = await axios.get(
      `http://localhost:7070/company/employee/${userid}`
    );
    const { data: permissionsFromAxios } = await axios.get(
      `http://localhost:7070/company/permissions/${userid}`
    );

    setUserFromDB({ ...usersFromAxios });
    setEmployeeFromJson({ ...employeeFromAxios });
    setPremssionsFromJson({ ...permissionsFromAxios });
  };

  useEffect(() => {
    settingUser();
  }, []);

  const [newUserPermissions, setNewUserPermissions] = useState([
    false /*"View Subscriptions" */,
    false /*Create Subscriptions */,
    false /*Delete Subscriptions */,
    false /*View Movies */,
    false /*Create Movies */,
    false /*Delete Movies */,
  ]);

  const handelPermi = () => {
    const arrOfOldPermissions = [false, false, false, false, false, false];
    for (let i = 0; i <= premssionsFromJson.permissions.length; i++) {
      if (premssionsFromJson.permissions[i] === "View Subscriptions") {
        arrOfOldPermissions[0] = true;
      } else if (premssionsFromJson.permissions[i] === "Create Subscriptions") {
        arrOfOldPermissions[1] = true;
      } else if (premssionsFromJson.permissions[i] === "Delete Subscriptions") {
        arrOfOldPermissions[2] = true;
      } else if (premssionsFromJson.permissions[i] === "View Movies") {
        arrOfOldPermissions[3] = true;
      } else if (premssionsFromJson.permissions[i] === "Create Movies") {
        arrOfOldPermissions[4] = true;
      } else if (premssionsFromJson.permissions[i] === "Delete Movies") {
        arrOfOldPermissions[5] = true;
      }
    }
    setNewUserPermissions([...arrOfOldPermissions]);
    setNewUserInfo({
      firstName: employeeFromJson.firstName,
      lastName: employeeFromJson.lastName,
      userName: employeeFromJson.userName,
      createdDate: employeeFromJson.createdDate,
      SessionTimeOut: employeeFromJson.SessionTimeOut,
    });
  };

  useEffect(() => {
    handelPermi();
  }, [premssionsFromJson]);

  const [newUserInfo, setNewUserInfo] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    createdDate: "",
    SessionTimeOut: 0,
  });

  const setUserInfo = (e) => {
    let user = { ...newUserInfo };
    user[e.target.name] = e.target.value;
    setNewUserInfo({ ...user });
  };

  //=================================submit
  const submit = async (e) => {
    e.preventDefault();

    //sand to db
    //Password: `${newUserInfo.lastName}1234`
    let newUser = {
      UserName: newUserInfo.userName,
      Password: `1234`,
    };

    await axios.put(`http://localhost:7070/company/users/${userFromDB._id}`, newUser);
    //get id tnd sand to employee.json
    newUser = { ...newUserInfo };
    newUser.userId = userFromDB._id;
    await axios.put(`http://localhost:7070/company/employee/${userFromDB._id}`, newUser);

    //get id tnd sand to permisions.json
    const arrOfPermisions = checkboxsToArrOfString();
    const userPermi = { userId: userFromDB._id, permissions: arrOfPermisions };
    await axios.put(`http://localhost:7070/company/permissions/${userFromDB._id}`, userPermi);

    //back to all users
    alert("user added");

    navigate("/manageusers/allusers");
  };
  //==================== end of submit

  const cancel = () => {
    navigate("/manageusers/allusers");
  };

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
      <span>Edit user</span>
      <br />
      {/* arrOfOldPermissions */}
      <form>
        <label htmlFor="View Subscriptions">View Subscriptions:</label>{" "}
        <input
          type={"checkbox"}
          onChange={hendelCheckbox}
          checked={newUserPermissions[0]}
          className="0"
          name="View Subscriptions"
        />
        <br />
        <label htmlFor="Create Subscriptions">Create Subscriptions:</label>{" "}
        <input
          type={"checkbox"}
          onChange={hendelCheckbox}
          checked={newUserPermissions[1]}
          className="1"
          name="Create Subscriptions"
        />
        <br />
        <label htmlFor="Delete Subscriptions">Delete Subscriptions:</label>{" "}
        <input
          type={"checkbox"}
          onChange={hendelCheckbox}
          checked={newUserPermissions[2]}
          className="2"
          name="Delete Subscriptions"
        />
        <br />
        <label htmlFor="View Movies">View Movies:</label>{" "}
        <input
          type={"checkbox"}
          onChange={hendelCheckbox}
          checked={newUserPermissions[3]}
          className="3"
          name="View Movies"
        />
        <br />
        <label htmlFor="Create Movies">Create Movies:</label>{" "}
        <input
          type={"checkbox"}
          onChange={hendelCheckbox}
          checked={newUserPermissions[4]}
          className="4"
          name="Create Movies"
        />
        <br />
        <label htmlFor="Delete Movies">Delete Movies:</label>{" "}
        <input
          type={"checkbox"}
          onChange={hendelCheckbox}
          checked={newUserPermissions[5]}
          className="5"
          name="Delete Movies"
        />
        <br />
        {/*  */}
        <label htmlFor="First Name">First Name: </label>
        <input
          type={"text"}
          defaultValue={employeeFromJson.firstName}
          onChange={setUserInfo}
          name="firstName"
        />
        <br />
        <label htmlFor="Last Name">Last Name: </label>
        <input
          type={"text"}
          defaultValue={employeeFromJson.lastName}
          onChange={setUserInfo}
          name="lastName"
        />
        <br />
        <label htmlFor="User Name">User Name: </label>
        <input
          type={"text"}
          defaultValue={employeeFromJson.userName}
          onChange={setUserInfo}
          name="userName"
        />
        <br />
        <label htmlFor="Created date"> Created date: </label>
        <input
          type={"date"}
          defaultValue={employeeFromJson.createdDate}
          onChange={setUserInfo}
          name="createdDate"
          //   defaultValue={coretTime}
        />
        <br />
        <label htmlFor="Session Time Out"> Session Time Out: </label>
        <input
          type={"number"}
          defaultValue={employeeFromJson.SessionTimeOut}
          onChange={setUserInfo}
          name="SessionTimeOut"
          min={0}
        />
        <br />
        {/*  */}
        <label htmlFor="submit"></label>
        <input type={"submit"} value="Update" onClick={submit} name="submit" />
        &nbsp; &nbsp;
        <label htmlFor="cancel"></label>
        <input type={"button"} value="Cancel" onClick={cancel} name="cancel" />
        <br />
      </form>
    </div>
  );
}
