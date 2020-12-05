import React from "react"
import "./Message.css";
import getImage from "../../util/img";

const Message = (props) => {
    if (props.your) {
        return (
            <div className="Message card">
                <div className="card-body-yours">
                    <div className="MessageBody">{props.message.body}</div>
                </div>
            </div>
        );
    }
    return (
        <div className="Message card">
            <div className="card-body">
              {props.message.id}
              {getImage(props.message.id)}
              <img src={getImage("cute-fox")}
                    className="MessageImage float-left mr-2"
                    alt={props.message.id + "'s avatar"}
                />
                <div className="MessageUsername">{props.message.id}</div>
                <div className="MessageBody">{props.message.body}</div>
            </div>
        </div>
    );
}

export default Message;
