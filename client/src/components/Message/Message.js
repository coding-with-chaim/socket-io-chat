import React from "react"
import "./Message.css";

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
                <img src="https://i.ibb.co/LxJzHr0/oof.png"
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
