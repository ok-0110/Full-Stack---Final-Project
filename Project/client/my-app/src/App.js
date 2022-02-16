import React from "react";
import Main from "./components/Main";
import "./css/fonts.css";

export default function App() {
  return (
    <div className="font300">
      <span className="font100">font100 </span> <br />
      <span className="font300">font300</span> <br/>
      <span className="fontBold">fontBold</span> <br/>
      <span className="fontBolder">fontBolder</span> <br/>
      <Main />
    </div>
  );
}
