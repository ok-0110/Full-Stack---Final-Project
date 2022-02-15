import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Show from "./Show";
import Fuse from "fuse.js";

export default function SearchComponent() {
  const [allShows, setAllShows] = useState([]);
  const { stringToSearch } = useParams();
  const [reload, setReload] = useState(false);

  const getAllshwos = async () => {
    const { data: allShowsFromDB } = await axios.get(`http://localhost:8080/subscriptions/shows`);
   
    console.log(allShowsFromDB);

    const options = {
        includeScore: true,
        keys: ["Name", "Genres"],
      };

      const fuse = new Fuse(allShowsFromDB, options);

      const result = fuse.search(stringToSearch);
      const showsResult = result.map((el) => el.item);


    const Shwos = showsResult.map((el) => {
      return <Show key={el._id} data={el} setReload={[reload, setReload]} />;
    });
    setAllShows(Shwos);
  };

  useEffect(() => {
    getAllshwos();
  }, [stringToSearch]);

  return (
    <div>
      Search Show
      {allShows}
    </div>
  );
}
