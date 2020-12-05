import React from "react"
import "./User.css";
import getImage from "../../util/img";

const User = (props) => {
  return (
    <div className="Message card">
      <div className="card-body-users">
          <img src={getImage(props.id)}
             className="MessageImage float-left mr-2"
             alt={props.id + "'s avatar"}
        />
        <div className="MessageUsername">{props.id}</div>
      </div>
    </div>
  );
}

export default User;
