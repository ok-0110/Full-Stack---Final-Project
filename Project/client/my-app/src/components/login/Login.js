import React, { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../MainContext";
import { Link,useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const {
    change: [anyChange, setAnyChange],
  } = useContext(MainContext);

  const [loggdUser, setLoggdUser] = useState({ userName: "", password: "" });

  const setUser = (e) => {
    let user = { ...loggdUser };
    user[e.target.name] = e.target.value;
    setLoggdUser({ ...user });
  };

  const verifyUser = async () => {
    const { data: allUsers } = await axios.get("http://localhost:7070/company/users");
    // console.log(allUsers);
    const user = allUsers.find((el) => el.UserName === loggdUser.userName);
    if (user === undefined) {
      alert("user-name not match :(");
    } else {
      if (user.Password === loggdUser.password) {
        login(user);
      } else {
        alert("password not match :(");
      }
    }
  };

  const login = async (userObj) => {
    if (loggdUser.password !== "1234") {
     const { data: userPremission } = await axios.get(
      `http://localhost:7070/company/permissions/${userObj._id}`
    );
    sessionStorage.setItem("permissions", JSON.stringify(userPremission.permissions));
    sessionStorage.setItem("isLogged", JSON.stringify(true));
    if (userPremission.permissions.find((el) => el === "Admin")) {
      sessionStorage.setItem("isAdmin", JSON.stringify(true));
      sessionStorage.setItem("name", JSON.stringify("admin"));
    } else {
      sessionStorage.setItem("isAdmin", JSON.stringify(false));
      const { data: useremployee } = await axios.get(
        `http://localhost:7070/company/employee/${userObj._id}`
      );
      sessionStorage.setItem("name", JSON.stringify(`${useremployee.firstName}`));

      //logic to add name and id to session from employee
    }
    setAnyChange(!anyChange); 
    }
    else {
      alert("is first time for you");
      navigate("/newuser");
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <h4>Login</h4>
      <span>userName : </span>
      <input name="userName" onChange={setUser} type={"text"} /> <br /> <br />
      <span>password : </span> <input name="password" onChange={setUser} type={"text"} /> <br />
      <br />
      <button onClick={verifyUser}>log me</button> &nbsp;
      <Link to="/newuser">first tame?</Link>
    </div>
  );
}
