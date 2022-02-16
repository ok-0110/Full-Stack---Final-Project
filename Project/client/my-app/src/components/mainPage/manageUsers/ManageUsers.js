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

  const buttons = (
    <div>
      &nbsp;{" "}
      <button onClick={navigateTo} class="all" name="manageusers/allusers">
        All Users
      </button>
      &nbsp;{" "}
      <button onClick={navigateTo} class="add" name="manageusers/adduser">
        Add User
      </button>
      &nbsp;
    </div>
  );

  return (
    <div>
      {buttons}

      <Routes>
        <Route path="*" element={<AllUsers />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/editUser/:userid" element={<EditUser />} />
      </Routes>
    </div>
  );
}
