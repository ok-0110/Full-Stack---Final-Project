import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import axios from "axios";

export default function User(props) {
 
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  const [reload, setReload] = props.setReload;

  useEffect(() => {
    getUserPermissions();
  }, []);

  const getUserPermissions = async () => {
    const { data: UserPermissions } = await axios.get(
      `http://localhost:7070/company/permissions/${props.data.userId}`
    );
    setPermissions(UserPermissions);
  };

  const deleteUser = async () => {
    if (window.confirm(`You sure you want to delete ${props.data.firstName}`)) {
      //user
      await axios.delete(`http://localhost:7070/company/users/${props.data.userId}`);
      //permission
      await axios.delete(`http://localhost:7070/company/permissions/${props.data.userId}`);
      //employee
      await axios.delete(`http://localhost:7070/company/employee/${props.data.userId}`);
      //reload
      setReload(!reload);
    }
  };

  const edit = () => {
   
    navigate(`/manageusers/editUser/${props.data.userId}`);
  };

  return (
    <div style={{ border: "1px solid black", margin: "4px" }}>
      <span>{`Name: ${props.data.firstName} ${props.data.lastName}`}</span> <br />
      <span>{`User Name: ${props.data.userName}`}</span> <br />
      <span>{`created date: ${props.data.createdDate}`}</span> <br />
      <span>{`session time out: ${props.data.SessionTimeOut}`}</span> <br />
      <span>{`permissions:`}</span>
      <ul>
        {permissions.permissions === undefined
          ? null
          : permissions.permissions.map((el, index) => <li key={index}>{el}</li>)}
      </ul>
      <button onClick={edit} name="">
        Edit
      </button>{" "}
      &nbsp; &nbsp;
      <button onClick={deleteUser} name="">
        Delete
      </button>
    </div>
  );
}
