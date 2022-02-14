import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddShow() {
  const navigate = useNavigate();

  const [newShowInfo, setNewShowInfo] = useState({
    Name: "",
    Genres: [],
    Image: "",
    Premiered: "",
  });
/*Name: "Selfie",
    Genres: ["Comedy","Romance"],
    Image: "https://static.tvmaze.com/uploads/images/medium_portrait/0/1756.jpg",
    Premiered: "2014-09-30",  */
  const setShowInfo = (e) => {
    let show = { ...newShowInfo };
    show[e.target.name] = e.target.value;
    setNewShowInfo({ ...show });
  };

  const cancel = () => {
    navigate("/shows/allshows");
  };

  const submit = async (e) => {
    //sand to db
    await axios.post(
      `http://localhost:8080/subscriptions/shows`,
      newShowInfo
    );
    //back to all show
    alert("show added");
    navigate("/shows/allshows")
  };
  return (
    <div>
      <label htmlFor="show Name">show Name: </label>
      <input type={"text"} onChange={setShowInfo} name="Name" />
      <br />
      <label htmlFor="Genres">Genres: </label>
      <input type={"text"} placeholder="Science-Fiction,Action,Crime" onChange={setShowInfo} name="Genres" />
      <br />
      <label htmlFor="Image URL">Image URL: </label>
      <input type={"text"} onChange={setShowInfo} name="Image" />
      <br />
      <label htmlFor="Premiered date"> Premiered date: </label>
      <input type={"date"} onChange={setShowInfo} name="Premiered" />
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
