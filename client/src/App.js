import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import Message from "./components/Message/Message";
import User from "./components/User/User";
import "./App.css";

const App = () => {

  const [currentMessage, setCurrentMessage] = useState("");
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      setYourID(id);
    });

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    });

    socketRef.current.on("connectu", (username) => {
      onlineUsers.push(username);
      console.log("connectu: " + username);
    });

    socketRef.current.on("fuck", (array) => {
      console.log(array);
      setOnlineUsers([]);
    });
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const messageObject = {
      body: currentMessage,
      id: yourID,
    };
    setCurrentMessage("");

    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(event) {
    event.preventDefault();

    setCurrentMessage(event.target.value);
  }

  return (
    <div className="App">
      <div className="container wrapper">
        <div className="row">
          <div className="col-9 p-3" style={{background: "white"}}>
            <div className="messages">
              {messages.map((message, index) => {
                if (message.id === yourID) {
                  return (
                    <Message key={index} message={message} your={true} />
                  )
                }
                return (
                  <Message key={index} message={message} />
                )
              })}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter your message..." aria-label="Message" onChange={handleChange} value={currentMessage}/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit"><i className="fas fa-paper-plane" /></button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-3 p-3" style={{background: "#3498db"}}>
            <h4 style={{color: "white"}}>Online users ({onlineUsers.length}):</h4>
            {onlineUsers.map((username, index) => {
              return (
                <User key={index} id={username} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
