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
    <div style={{ padding: "10px", border: "1px solid black", margin: "4px" }}>
      <div style={{ display: "flex" }}>
        <div>
          <span className="fontBold">Name: </span>
          <span
            className="fontBolder"
            style={{ fontSize: "17px" }}
          >{`${props.data.firstName} ${props.data.lastName}`}</span>{" "}
          <br />
          <span className="fontBold">User Name: </span>
          <span>{`${props.data.userName}`}</span> <br />
          <span className="fontBold">created date: </span>
          <span>{`${props.data.createdDate}`}</span> <br />
          <span className="fontBold">session time out: </span>
          <span>{`${props.data.SessionTimeOut}`}</span>
          <br />
          <br />
          &nbsp;
          <button onClick={edit} class="edit" name="">
            <span class="text">Edit</span>
          </button>{" "}
          &nbsp; &nbsp;
          <button onClick={deleteUser} class="delete" name="">
            <span class="text">Delete</span>
          </button>
        </div>

        <div style={{ paddingLeft: "10px" }}>
          &nbsp; &nbsp; &nbsp;<span className="fontBold">{`permissions:`}</span>
          <ul>
            {permissions.permissions === undefined
              ? null
              : permissions.permissions.map((el, index) => <li key={index}>{el}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
