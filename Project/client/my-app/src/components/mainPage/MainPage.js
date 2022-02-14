import React, { useContext } from "react";
import MainContext from "../MainContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ManageUsers from "./manageUsers/ManageUsers";
import Shows from "./shows/Shows";
import Members from "./Subscribers/Members";


export default function MainPage() {
  const {
    change: [anyChange, setAnyChange],
  } = useContext(MainContext);
  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  const nameOfUser = JSON.parse(sessionStorage.getItem("name"));
  const permissions = JSON.parse(sessionStorage.getItem("permissions"));

  const navigate = useNavigate();

  const navigateTo = (e) => {
    navigate(`/${e.target.name}`);
  };

  const logOut = () => {
    if (window.confirm("log out?")) {
      sessionStorage.clear();
      console.log("logOut");
      navigate("/");
      setAnyChange(!anyChange);
    }
  };

  const adminButtons = (
    <div>
      <button onClick={navigateTo} name="manageusers">
        Users Managment
      </button>
      &nbsp;
      <button onClick={navigateTo} name="shows">
        Shows
      </button>
      &nbsp;
      <button onClick={navigateTo} name="Subscribers">
        Subscriptions
      </button>
      &nbsp;
      <button onClick={logOut}>Log Out</button> &nbsp;
    </div>
  );
  const employeeButtons = (
    <div>
      {permissions.find((el) => el === "View Movies") ? (
        <button onClick={navigateTo} name="shows">
          Shows
        </button>
      ) : null}
      {permissions.find((el) => el === "View Subscriptions") ? (
        <button onClick={navigateTo} name="Subscribers">
          Subscriptions
        </button>
      ) : null}
      <button onClick={logOut}>Log Out</button> &nbsp;
    </div>
  );
  //=============================================start of return
  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <h3>{`hello ${nameOfUser}, Welcome back`}</h3>
      {isAdmin ? adminButtons : employeeButtons}
      <Routes>
        <Route path="*" element={null} />
        {/* <Route path="/" element={null} /> */}
        <Route path="/manageusers/*" element={<ManageUsers />} />
        <Route path="/shows/*" element={<Shows />} />
        <Route path="/Subscribers/*" element={<Members/>} />
      </Routes>
      <br /> <span>main footer</span>
    </div>
  );
}
