import React,{useState} from "react";
// import SubscriptionsTOMember from "./SubscriptionsTOMember";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Subscribers from "./Subscribers";

export default function Member(props) {
  const navigate = useNavigate();
  const [reload, setReload] = props.setReload;
  

  const canDelete = JSON.parse(sessionStorage.getItem("canDelete"));

  const edit = () => {
    navigate(`/Subscribers/editmember/${props.data._id}`);
  };

  const deleteMember = async () => {
    if (window.confirm(`You sure you want to delete ${props.data.Name}?`)) {
      // delet member
      await axios.delete(`http://localhost:8080/subscriptions/members/${props.data._id}`);

      //delet Member from subs
      await axios.delete(`http://localhost:8080/subscriptions/subscribers/${props.data._id}`);

      //reload
      setReload(!reload);
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span>{props.data.Name}</span> <br />
      <span>{`Email: ${props.data.Email} `}</span> <br />
      <span>{`City: ${props.data.City} `}</span> <br />
      {/* <SubscriptionsTOMember memberId={props.data._id} /> */}
      <button onClick={edit} name="">
        Edit
      </button>{" "}
      &nbsp; &nbsp;
      {canDelete ? (
        <button onClick={deleteMember} name="">
          Delete
        </button>
      ) : null}
      <Subscribers memberId={props.data._id} setReload={props.setReload} />
    </div>
  );
}
