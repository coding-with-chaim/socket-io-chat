import React from "react"
import "./User.css";

const User = (props) => {
  return (
    <div className="Message card">
      <div className="card-body">
        <img src="https://i.ibb.co/LxJzHr0/oof.png"
             className="MessageImage float-left mr-2"
             alt={props.id + "'s avatar"}
        />
        <div className="MessageUsername">{props.id}</div>
      </div>
    </div>
  );
}

export default User;
