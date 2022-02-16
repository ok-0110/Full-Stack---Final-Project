import React from "react";
import SubscriptionsTOShow from "./SubscriptionsTOShow";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Show(props) {
  const navigate = useNavigate();
  const [reload, setReload] = props.setReload;
  const date = props.data.Premiered.slice(0, 4);
  const canDelete = JSON.parse(sessionStorage.getItem("canDelete"));

  const edit = () => {
    navigate(`/shows/editshow/${props.data._id}`);
  };

  const deleteShow = async () => {
    if (window.confirm(`You sure you want to delete ${props.data.Name}?`)) {
      // delet show
      await axios.delete(`http://localhost:8080/subscriptions/shows/${props.data._id}`);

      //delet Show from subs
      const { data: SubsFromDb } = await axios.get(
        `http://localhost:8080/subscriptions/subscribers`
      );

      SubsFromDb.forEach((element) => {
        element.Shows.forEach(async (el) => {
          if (el.showId === props.data._id) {
            console.log(el.showId);
            console.log(props.data._id);
            console.log(element.MemberId);

            delete (await axios.put(
              `http://localhost:8080/subscriptions/subscribers/removeShow/${element.MemberId}/${props.data._id}`
            ));
          }
        });
      });

      //reload
      setReload(!reload);
    }
  };

  return (
    <div style={{ paddingLeft: "5px", border: "1px solid black", margin: "4px" }}>
      <span className="fontBolder" style={{ fontSize: "17px" }}>
        {props.data.Name} ,{" "}
      </span>
      <span> {date}</span> <br />
      <span className="fontBold">Genres: </span>
      <span>{`"${props.data.Genres.join('", "')}" `}</span> <br />
      <img  class="itsImg" src={props.data.Image} alt={`of ${props.data.Name}`} height="100" />
      <SubscriptionsTOShow showId={props.data._id} />
      &nbsp;{" "}
      <button onClick={edit} class="edit" role="button">
        <span class="text">Edit</span>
      </button>
      &nbsp; &nbsp;
      {canDelete ? (
        <button onClick={deleteShow} class="delete" role="button">
          <span class="text">Delete</span>
        </button>
      ) : null}
      <br />
      <br />
    </div>
  );
}
