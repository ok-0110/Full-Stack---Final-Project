import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function AddShow() {
  const navigate = useNavigate();

  const [nameValid, setNameValid] = useState(false);
  const [genresValid, setGenresValid] = useState(false);
  const [imagValid, setimagValid] = useState(false);

  const [newShowInfo, setNewShowInfo] = useState({
    Name: "",
    Genres: [],
    Image: "",
    Premiered: "",
  });

  const setShowInfo = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "Name":
        isValid = validator.isByteLength(e.target.value, { min: 1, max: undefined });

        setNameValid(isValid);
        break;

      case "Genres":
        isValid = validator.isByteLength(e.target.value, { min: 1, max: undefined });

        setGenresValid(isValid);
        break;
      case "Image":
        isValid = validator.isByteLength(e.target.value, { min: 1, max: undefined });
        setimagValid(isValid);
        break;

      default:
        break;
    }
    if (isValid) {
      let show = { ...newShowInfo };
      show[e.target.name] = e.target.value;
      setNewShowInfo({ ...show });
    }
  };

  const cancel = () => {
    navigate("/shows/allshows");
  };

  const submit = async () => {
    if (nameValid && genresValid && imagValid) {
      //sand to db
      await axios.post(`http://localhost:8080/subscriptions/shows`, newShowInfo);
      //back to all show
      alert("show added");
      navigate("/shows/allshows");
    }
  };
  //nameValid genresValid imagValid
  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <br />
      <label htmlFor="show Name">show Name: </label>
      <input type={"text"} onChange={setShowInfo} name="Name" />
      <br />
      {nameValid ? null : <span>show is invalid use Min of 1 letters</span>} <br />
      <label htmlFor="Genres">Genres: </label>
      <input
        type={"text"}
        placeholder="Science-Fiction,Action,Crime"
        onChange={setShowInfo}
        name="Genres"
      />{" "}
      <br />
      {genresValid ? null : <span>Genres is invalid use Min of 1 letters </span>} <br />
      <label htmlFor="Image URL">Image URL: </label>
      <input type={"text"} onChange={setShowInfo} name="Image" />
      <br />
      {imagValid ? null : <span>Image is invalid use Min of 1 letters</span>} <br />
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
