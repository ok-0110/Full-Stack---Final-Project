import React, { useState, useEffect } from "react";
import axios from "axios";
import Show from "./Show";

export default function AllShows() {
  const [allShows, setAllShows] = useState([]);
  const [reload, setReload] = useState(false);


  const getAllshwos = async () => {
    const { data: allShowsFromDB } = await axios.get(`http://localhost:8080/subscriptions/shows`);
    // const [allShows, setAllShows] = useState([]);

    const Shwos = allShowsFromDB.map((el) => {
      return <Show key={el._id} data={el}  setReload={[reload, setReload]}/>; 
    });
    setAllShows(Shwos);
  };
  useEffect(()=>{
    getAllshwos()
  },[reload])
  return (
    <div>
      All Shows
      {allShows}
    </div>
  );
}
