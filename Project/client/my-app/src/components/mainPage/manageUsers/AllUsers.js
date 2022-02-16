import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "./user/User";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [reload, setReload] = useState([]);

  useEffect(() => {
    
    getAllEmployees();
  }, [reload]);

  const getAllEmployees = async () => { 
    const { data: allEmployeedsFromJson } = await axios.get(
      `http://localhost:7070/company/employee`
    );

    const Users = allEmployeedsFromJson.map((el) =>  {
      return <User key={el.userId} data={el} setReload={[reload, setReload]}  />;
    });
    setAllUsers(Users) 
  };

  // const renderUsers =  () => {
   
  // };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      
      {allUsers}
    </div>
  );
}
