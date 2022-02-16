import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import validator from "validator";

export default function AddMember() {
  const navigate = useNavigate();

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [cityValid, setCityValid] = useState(false);

  const [newMemberInfo, setNewMemberInfo] = useState({
    Name: "",
    Email: "",
    City: "",
  });

  const setMemberInfo = (e) => {
    let isValid = true;
    switch (e.target.name) {
      case "Name":
        isValid = validator.isAlpha(e.target.value, "en-US", {
          ignore: " -",
        });
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: 10 });
        }
        setNameValid(isValid);
        break;

      case "Email": //================
        isValid = validator.isEmail(e.target.value);
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: undefined });
        }
        setEmailValid(isValid);
        break;
      case "City":
        isValid = validator.isAlpha(e.target.value, "en-US", {
          ignore: " -",
        });
        if (isValid) {
          isValid = validator.isByteLength(e.target.value, { min: 2, max: 10 });
        }
        setCityValid(isValid);
        break;

      default:
        break;
    }
    if (isValid) {
    }
    let member = { ...newMemberInfo };
    member[e.target.name] = e.target.value;
    setNewMemberInfo({ ...member });
  };

  const cancel = () => {
    navigate("/Subscribers/allmembers");
  };

  const submit = async (e) => {
    if (nameValid && emailValid && cityValid) {
      //sand member to DB and sub to DB
      await axios.post(`http://localhost:8080/subscriptions/members`, newMemberInfo);

      //back to all member
      alert("member updated");
      navigate("/Subscribers/allmembers");
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span className="fontBolder" style={{ fontSize: "20px" }}>
        Add Member{" "}
      </span>{" "}
      <br /> <br />
      <label className="fontBold" htmlFor="member Name">
        member Name:{" "}
      </label>
      <input type={"text"} onChange={setMemberInfo} name="Name" />
      <br />
      {nameValid ? null : (
        <span style={{ fontSize: "12px", color: "#690b03" }}>
          name is invalid use only A-Z , a-z and Min of 2 letters and max of 10
        </span>
      )}
      <br />
      <label className="fontBold" htmlFor="Email">
        Email:{" "}
      </label>
      <input type={"text"} onChange={setMemberInfo} name="Email" />
      <br />
      {emailValid ? null : (
        <span style={{ fontSize: "12px", color: "#690b03" }}>
          email is invalid use "normal" email and Min of 2 letters
        </span>
      )}
      <br />
      <label className="fontBold" htmlFor="City">
        City:{" "}
      </label>
      <input type={"text"} onChange={setMemberInfo} name="City" />
      <br />
      {cityValid ? null : (
        <span style={{ fontSize: "12px", color: "#690b03" }}>
          name is invalid use only A-Z , a-z and Min of 2 letters and max of 10
        </span>
      )}
      <br />
      {/* <label htmlFor="submit"></label>
      <input type={"submit"} value="Add" onClick={submit} name="submit" />
      &nbsp; &nbsp;
      <label htmlFor="cancel"></label>
      <input type={"button"} value="Cancel" onClick={cancel} name="cancel" />
      <br /> */}
      &nbsp;{" "}
      <button class="updateOrAdd" role="button" onClick={submit} name="submit">
        <span class="text">Add</span>
      </button>
      &nbsp;{" "}
      <button class="cancel" role="button" onClick={cancel} name="cancel">
        {" "}
        <span class="text">Cancel</span>
      </button>
      <br />
      <br />
    </div>
  );
}
