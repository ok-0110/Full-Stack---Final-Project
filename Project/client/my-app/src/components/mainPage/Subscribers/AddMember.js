import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AddMember() {

  const navigate = useNavigate();

  const [newMemberInfo, setNewMemberInfo] = useState({
    Name: "",
    Email: "",
    City: "",
  });

  const setMemberInfo = (e) => {
    let member = { ...newMemberInfo };
    member[e.target.name] = e.target.value;
    setNewMemberInfo({ ...member });
  };

  const cancel = () => {
    navigate("/Subscribers/allmembers");
  };

  const submit = async (e) => {
    //sand member to DB and sub to DB
    await axios.post(`http://localhost:8080/subscriptions/members`, newMemberInfo);
    
    //back to all member
    alert("member updated");
    navigate("/Subscribers/allmembers");
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span>Edit Member </span> <br/>
      <label htmlFor="member Name">member Name: </label>
      <input type={"text"} onChange={setMemberInfo} name="Name" />
      <br />
      <label htmlFor="Email">Email: </label>
      <input type={"text"} onChange={setMemberInfo} name="Email" />
      <br />
      <label htmlFor="City">City: </label>
      <input type={"text"} onChange={setMemberInfo} name="City" />
      <br />
      <label htmlFor="submit"></label>
      <input type={"submit"} value="Add" onClick={submit} name="submit" />
      &nbsp; &nbsp;
      <label htmlFor="cancel"></label>
      <input type={"button"} value="Cancel" onClick={cancel} name="cancel" />
      <br />
    </div>
  );
}
