import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";
import EditUser from "./user/EditUser";
export default function ManageUsers() {
  const navigate = useNavigate();

  const navigateToMainPage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("isAdmin"))) {
      navigateToMainPage();
    }
  });

  const navigateTo = (e) => {
    navigate(`/${e.target.name}`);
  };

  const buttons = (<div>
        <button onClick={navigateTo} name="manageusers/allusers">
        All Users
      </button> 
        <button onClick={navigateTo} name="manageusers/adduser">
        Add User
      </button>
      &nbsp;
  </div>)

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
        <br/> 
        {buttons}
        <br/>
    
      <Routes>
        <Route path="*" element={<AllUsers />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/editUser/:userid" element={<EditUser />} />
      </Routes>
    </div>
  );
}
