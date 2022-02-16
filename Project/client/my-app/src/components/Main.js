import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainContext from "./MainContext";
import Login from "./login/Login";
import FirstTime from "./login/FirstTime";
import MainPage from "./mainPage/MainPage";

export default function Main() {
  const [idEditUser, setIdEditUser] = useState("");
  const [anyChange, setAnyChange] = useState(false);
  if (sessionStorage.getItem("isLogged") === null) {
    sessionStorage.setItem("isLogged", JSON.stringify(false));
  }

  const data = { change: [anyChange, setAnyChange], idEditUser: [idEditUser, setIdEditUser] };

  return (
    <MainContext.Provider value={data}>
      <div>
        {JSON.parse(sessionStorage.getItem("isLogged")) ? (
          <div>
            <Routes>
              <Route path="*" element={<MainPage />} />
            </Routes>
          </div>
        ) : (
          <div>
            <Routes>
              <Route path="*" element={<Login />} />

              <Route path="/newuser" element={<FirstTime />} />
            </Routes>
          </div>
        )}
      </div>
    </MainContext.Provider>
  );
}
