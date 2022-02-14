import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditShow() {
  const navigate = useNavigate();
  const { showid } = useParams();

  const [newShowInfo, setNewShowInfo] = useState({
    Name: "",
    Genres: [],
    Image: "",
    Premiered: "",
  });

  const settingShow = async () => {
    const { data: showsFromAxios } = await axios.get(
      `http://localhost:8080/subscriptions/shows/${showid}`
    );

    setNewShowInfo({ ...showsFromAxios });
  };

  useEffect(() => {
    settingShow();
  }, []);

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
    await axios.put(`http://localhost:8080/subscriptions/shows/${showid}`, newShowInfo);
    //back to all show
    alert("show updated");
    navigate("/shows/allshows");
  };


  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span>Edit Show </span>
      <label htmlFor="show Name">show Name: </label>
      <input type={"text"} onChange={setShowInfo} name="Name" defaultValue={newShowInfo.Name}/>
      <br />
      <label htmlFor="Genres">{ `Genres: (after every genre put ",") `}</label>
      <input type={"text"} onChange={setShowInfo} name="Genres" defaultValue={newShowInfo.Genres}/>
      <br />
      <label htmlFor="Image URL">Image URL: </label>
      <input type={"text"} onChange={setShowInfo} name="Image" defaultValue={newShowInfo.Image}/>
      <br />
      <label htmlFor="Premiered date"> Premiered date: </label>
      <input type={"date"} onChange={setShowInfo} name="Premiered" defaultValue={newShowInfo.Premiered.slice(0, 10)}/>
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
