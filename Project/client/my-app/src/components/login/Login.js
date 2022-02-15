import React, { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../MainContext";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

export default function Login() {
  const navigate = useNavigate();
  const [nameValid, setNameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const {
    change: [anyChange, setAnyChange],
  } = useContext(MainContext);

  const [loggdUser, setLoggdUser] = useState({ userName: "", password: "" });

  const setUser = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "userName":
        isValid = validator.isAlphanumeric(e.target.value);
        setNameValid(e.target.value === "" ? true : isValid);
        break;

      case "password":
        isValid = validator.isAlphanumeric(e.target.value, "en-US", {
          ignore: ".,!@#$%^&*-+=_()/?'`;><[]{}|~",
        }); // /.,@#$%^&*()=-+ //
        setPasswordValid(e.target.value === "" ? true : isValid);
        break;

      default:
        break;
    }

    if (isValid) {
      let user = { ...loggdUser };
      user[e.target.name] = e.target.value;
      setLoggdUser({ ...user });
    }
  };

  const verifyUser = async () => {
    if (nameValid && passwordValid) {
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
      return;
    }
    //
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
      }
      setAnyChange(!anyChange);
    } else {
      alert("is first time for you");
      navigate("/newuser");
    }
  };

const adminButt = ()=>{
  

}


  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <h4>Login</h4> 
      {/* <button onClick={adminButt} >Admin</button> */}
      <span>userName : </span>
      <input name="userName" id="userName" onChange={setUser} type={"text"} /> <br />
      {nameValid ? null : <span>name is invalid use only A-Z , a-z , 1-9</span>}
      <br />
      <span>password : </span> <input name="password" id="password" onChange={setUser} type={"text"} /> <br />
      {passwordValid ? null : <span>password is invalid dont use space </span>}
      <br />
      <button onClick={verifyUser}>log me</button> &nbsp;
      <Link to="/newuser">first tame?</Link>
    </div>
  );
}
