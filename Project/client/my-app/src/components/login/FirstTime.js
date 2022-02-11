import React from 'react';
import { Link } from "react-router-dom";

export default function FirstTime() {
  return <div>
      <span>create Account</span> <br/>
      <Link to="/">back to login</Link>
  </div>;
}
