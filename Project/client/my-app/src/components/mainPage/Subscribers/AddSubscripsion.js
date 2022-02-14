import axios from "axios";
import React, { useState, useEffect } from "react";

export default function AddSubscripsion(props) {
  const [shows, setShows] = useState([]);
  const [subs, setSubs] = useState([]);
  const [coretTime, setCoretTime] = useState([]);

  const [options, setOptions] = useState([]);
  /**{
      label: "Apple",
      value: "apple",
    } */

  useEffect(() => {
    const getShows = async () => {
      const { data: AllShows } = await axios.get(`http://localhost:8080/subscriptions/shows`);
      // console.log(AllShows);
      setShows(AllShows);
    };
    const getSubs = async () => {
      const { data: AllSubs } = await axios.get(
        `http://localhost:8080/subscriptions/subscribers/memnerId/${props.memberId}`
      );
      // console.log(AllSubs);
      setSubs(AllSubs);
    };
    getSubs();
    getShows();
  }, [props.memberId]);

  const getOptinos = () => {
    //   console.log(subs);
    //   console.log(shows);
    const helper = [...options];
    shows.forEach((element) => {
      let match = false;
      let helperToOptios = {
        label: element.Name,
        value: element._id,
      };
      if (subs.Shows) {
        if (subs.Shows.length >= 1) {
          subs.Shows.forEach((el) => {
            if (element._id === el.showId) {
              match = true;
            }
          });
        }
      }

      if (!match) {
        helper.push(helperToOptios);
      }
    });
    setOptions(helper);
  };

  const [newMemberSun, setNewMemberSun] = useState({ showId: " ", date: coretTime });

  useEffect(() => {
    getOptinos();
  }, [shows]);

  const setUserInfo = (e) => {
    let user = { ...newMemberSun };
    user[e.target.name] = e.target.value;
    setNewMemberSun({ ...user });
  };

  useEffect(() => {
    const getTime = () => {
      let todayDate = new Date().toISOString().slice(0, 10);
      setCoretTime(todayDate);
    };
    getTime();
  }, []);

  useEffect(() => {
    setNewMemberSun({ showId: " ", date: coretTime });
  }, [coretTime]);


  
  const saveNewSub = async () => {
      const [reload, setReload] = props.setReload 
    if (newMemberSun.showId !== " ") {
        //add to db
        const {data:respons}= await axios.put(`http://localhost:8080/subscriptions/subscribers/addShow/${props.memberId}/${newMemberSun.showId}/${newMemberSun.date}`)
        console.log(respons);
        //apdate page 
        window.location.reload();

        alert("Aded show")
    }else{
        alert("please select show")
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <select name="showId" onChange={setUserInfo}>
        <label htmlFor="Add new Show"></label>{" "}
        <option disabled selected value="demo">
          Select Show
        </option>{" "}
        {/*  selected maid a eror - need to fix*/}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select> &nbsp;
      <label htmlFor="Date">Date :</label>{" "} 
      <input type={"date"} onChange={setUserInfo} name="date" defaultValue={coretTime} /> <br/>
      <button onClick={saveNewSub}>Add To Subscripsions </button>
    </div>
  );
}
