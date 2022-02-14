import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMember() {
  const navigate = useNavigate();
  const { memberid } = useParams();

  const [newMemberInfo, setNewMemberInfo] = useState({
    Name: "",
    Email: "",
    City: "",
  });

  const settingMember = async () => {
    const { data: membersFromAxios } = await axios.get(
      `http://localhost:8080/subscriptions/members/${memberid}`
    );

    setNewMemberInfo({ ...membersFromAxios });
  };

  useEffect(() => {
    settingMember();
  }, []);

  const setMemberInfo = (e) => {
    let member = { ...newMemberInfo };
    member[e.target.name] = e.target.value;
    setNewMemberInfo({ ...member });
  };

  const cancel = () => {
    navigate("/Subscribers/allmembers");
  };

  const submit = async (e) => {
    //sand to db
    await axios.put(`http://localhost:8080/subscriptions/members/${memberid}`, newMemberInfo);
    //back to all member
    alert("member updated");
    navigate("/Subscribers/allmembers");
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span>Edit Member </span>
      <label htmlFor="member Name">member Name: </label>
      <input type={"text"} onChange={setMemberInfo} name="Name" defaultValue={newMemberInfo.Name} />
      <br />
      <label htmlFor="Email">Email: </label>
      <input
        type={"text"}
        onChange={setMemberInfo}
        name="Email"
        defaultValue={newMemberInfo.Email}
      />
      <br />
      <label htmlFor="City">City: </label>
      <input type={"text"} onChange={setMemberInfo} name="City" defaultValue={newMemberInfo.City} />
      <br />
      <label htmlFor="submit"></label>
      <input type={"submit"} value="Update" onClick={submit} name="submit" />
      &nbsp; &nbsp;
      <label htmlFor="cancel"></label>
      <input type={"button"} value="Cancel" onClick={cancel} name="cancel" />
      <br />
    </div>
  );
}
