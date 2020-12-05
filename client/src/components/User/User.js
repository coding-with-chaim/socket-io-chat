import React from "react"
import "./User.css";

const User = (props) => {
  return (
    <div className="Message card">
      <div className="card-body-users">
              <img src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
             className="MessageImage float-left mr-2"
             alt={props.id + "'s avatar"}
        />
        <div className="MessageUsername">{props.id}</div>
      </div>
    </div>
  );
}

export default User;
