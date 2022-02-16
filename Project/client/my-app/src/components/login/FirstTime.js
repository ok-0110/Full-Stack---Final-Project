import React, { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../MainContext";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

export default function FirstTime() {
  const navigate = useNavigate();
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [newpasswordValid, setNewPasswordValid] = useState(false);

  const {
    change: [anyChange, setAnyChange],
  } = useContext(MainContext);

  const [newloggdUser, setNewLoggdUser] = useState({ newPassword: "" });
  const [loggdUser, setLoggdUser] = useState({ userName: "", password: "" });

  const setUser = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "userName":
        isValid = validator.isAlphanumeric(e.target.value);
        setNameValid(isValid);
        break;

      case "password":
        isValid = validator.isAlphanumeric(e.target.value, "en-US", {
          ignore: ".,!@#$%^&*-+=_()/?'`;><[]{}|~",
        }); // /.,@#$%^&*()=-+ //
        setPasswordValid(isValid);
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
  const setUser2 = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "newPassword":
        isValid = validator.isAlphanumeric(e.target.value, "en-US", {
          ignore: ".,!@#$%^&*-+=_()/?'`;><[]{}|~",
        }); // /.,@#$%^&*()=-+ //
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: 10 });
        }
        setNewPasswordValid(isValid);
        break;

      default:
        break;
    }
    if (isValid) {
      let user = { ...newloggdUser };
      user[e.target.name] = e.target.value;
      setNewLoggdUser({ ...user });
    }
  };

  const verifyUser = async () => {
    if (nameValid && passwordValid && newpasswordValid) {
      const { data: allUsers } = await axios.get("http://localhost:7070/company/users");
      // console.log(allUsers);
      const user = allUsers.find((el) => el.UserName === loggdUser.userName);
      if (user === undefined) {
        alert("user-name not match :(");
      } else {
        if (user.Password === loggdUser.password) {
          replacePassword(user);
        } else {
          alert("corent password not match :(");
        }
      }
    }
  };

  const replacePassword = async (user) => {
    if (loggdUser.password === "1234") {
      if (newloggdUser.newPassword !== "1234") {
        const newUser = { ...user };
        newUser.Password = newloggdUser.newPassword;
        console.log(newUser);
        const { data: response } = await axios.put(
          `http://localhost:7070/company/users/${user._id}`,
          newUser
        );
        console.log(response);
        setAnyChange(!anyChange);
        navigate("/");
      } else {
        alert("1234 is for first time only");
      }
    } else {
      alert("1234 is the the Initialization pasword ");
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <h4>First Time?</h4>
      <span>userName : </span>
      <input name="userName" onChange={setUser} type={"text"} /> <br />
      {nameValid ? null : <span>name is invalid use only A-Z , a-z , 1-9</span>} <br />
      <span>Corent password : </span> <input name="password" onChange={setUser} type={"text"} />{" "}
      <br />
      {passwordValid ? null : <span>password is invalid dont use space </span>}
      <br />
      <span>New password : </span> <input name="newPassword" onChange={setUser2} type={"text"} />{" "}
      <br />
      {newpasswordValid ? null : <span>password is invalid dont use space </span>}
      <br />
      <button onClick={verifyUser}>set me</button> &nbsp;
      <Link to="/">back to login</Link>;
    </div>
  );
}
