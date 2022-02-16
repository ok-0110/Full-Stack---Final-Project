import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";

export default function EditShow() {
  const navigate = useNavigate();
  const { showid } = useParams();

  const [nameValid, setNameValid] = useState(true);
  const [genresValid, setGenresValid] = useState(true);
  const [imagValid, setimagValid] = useState(true);

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

  const submit = async (e) => {
    if (nameValid && genresValid && imagValid) {
      //sand to db
      await axios.put(`http://localhost:8080/subscriptions/shows/${showid}`, newShowInfo);
      //back to all show
      alert("show updated");
      navigate("/shows/allshows");
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <br />
      <span className="fontBolder">Edit Show </span> <br />
      <br />
      <label htmlFor="show Name" className="fontBold">
        show Name:{" "}
      </label>
      <input type={"text"} onChange={setShowInfo} name="Name" defaultValue={newShowInfo.Name} />
      <br />
      {nameValid ? null : <span>show is invalid use Min of 1 letters</span>} <br />
      <label htmlFor="Genres" className="fontBold">{`Genres: `}</label>
      <input type={"text"} onChange={setShowInfo} name="Genres" defaultValue={newShowInfo.Genres} />
      <br />
      {genresValid ? null : <span>Genres is invalid use Min of 1 letters </span>} <br />
      <label htmlFor="Image URL" className="fontBold">
        Image URL:{" "}
      </label>
      <input type={"text"} onChange={setShowInfo} name="Image" defaultValue={newShowInfo.Image} />
      <br />
      {imagValid ? null : <span>Image is invalid use Min of 1 letters</span>} <br />
      <label htmlFor="Premiered date" className="fontBold">
        {" "}
        Premiered date:{" "}
      </label>
      <input
        type={"date"}
        onChange={setShowInfo}
        name="Premiered"
        defaultValue={newShowInfo.Premiered.slice(0, 10)}
      />
      <br />
     
      <br />
      &nbsp;{" "}
      <button class="updateOrAdd" role="button" onClick={submit} name="submit">
        <span class="text">Update</span>
      </button>
      &nbsp;{" "}
      <button class="cancel" role="button" onClick={cancel} name="cancel">
        <span class="text">Cancel</span> 
      </button>
      <br /><br />
    </div>
  );
}
